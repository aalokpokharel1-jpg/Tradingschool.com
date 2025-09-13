import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CreatePostModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
    level: 'beginner',
    attachments: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categoryOptions = [
    { value: 'general', label: 'General Discussion' },
    { value: 'strategy', label: 'Trading Strategies' },
    { value: 'analysis', label: 'Market Analysis' },
    { value: 'psychology', label: 'Trading Psychology' },
    { value: 'tools', label: 'Tools & Platforms' },
    { value: 'success', label: 'Success Stories' },
    { value: 'help', label: 'Help & Support' }
  ];

  const levelOptions = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'all', label: 'All Levels' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);

    try {
      const postData = {
        ...formData,
        tags: formData?.tags?.split(',')?.map(tag => tag?.trim())?.filter(tag => tag),
        timestamp: new Date()?.toISOString()
      };

      await onSubmit(postData);
      
      // Reset form
      setFormData({
        title: '',
        content: '',
        category: '',
        tags: '',
        level: 'beginner',
        attachments: []
      });
      
      onClose();
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e?.target?.files);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev?.attachments, ...files]
    }));
  };

  const removeAttachment = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev?.attachments?.filter((_, i) => i !== index)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg brand-shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-growth rounded-lg flex items-center justify-center">
              <Icon name="Plus" size={20} color="white" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-xl font-heading font-heading-semibold text-primary">
                Create New Post
              </h2>
              <p className="text-sm text-muted-foreground">
                Share your thoughts with the community
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <Input
            label="Post Title"
            type="text"
            placeholder="What's your question or topic?"
            value={formData?.title}
            onChange={(e) => handleInputChange('title', e?.target?.value)}
            required
            className="mb-4"
          />

          {/* Category and Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Category"
              options={categoryOptions}
              value={formData?.category}
              onChange={(value) => handleInputChange('category', value)}
              placeholder="Select a category"
              required
            />
            <Select
              label="Experience Level"
              options={levelOptions}
              value={formData?.level}
              onChange={(value) => handleInputChange('level', value)}
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Content
            </label>
            <textarea
              placeholder="Share your thoughts, ask questions, or provide insights..."
              value={formData?.content}
              onChange={(e) => handleInputChange('content', e?.target?.value)}
              required
              rows={6}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
          </div>

          {/* Tags */}
          <Input
            label="Tags"
            type="text"
            placeholder="trading, strategy, analysis (comma separated)"
            value={formData?.tags}
            onChange={(e) => handleInputChange('tags', e?.target?.value)}
            description="Add relevant tags to help others find your post"
          />

          {/* File Attachments */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Attachments (Optional)
            </label>
            <div className="border-2 border-dashed border-border rounded-lg p-4">
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <Icon name="Upload" size={24} className="text-muted-foreground mb-2" />
                <span className="text-sm text-muted-foreground">
                  Click to upload files or drag and drop
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  Images, PDFs, Documents (Max 10MB each)
                </span>
              </label>
            </div>

            {/* Attachment List */}
            {formData?.attachments?.length > 0 && (
              <div className="mt-3 space-y-2">
                {formData?.attachments?.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Icon name="Paperclip" size={16} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">{file?.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ({(file?.size / 1024 / 1024)?.toFixed(2)} MB)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      className="p-1 rounded text-muted-foreground hover:text-destructive transition-colors duration-200"
                    >
                      <Icon name="X" size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Guidelines */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-2 flex items-center">
              <Icon name="Info" size={16} className="mr-2" />
              Community Guidelines
            </h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Be respectful and constructive in your discussions</li>
              <li>• Stay on topic and provide valuable insights</li>
              <li>• No promotional content or spam</li>
              <li>• Use appropriate tags to help others find your content</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              loading={isSubmitting}
              iconName="Send"
              iconPosition="left"
            >
              {isSubmitting ? 'Publishing...' : 'Publish Post'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;