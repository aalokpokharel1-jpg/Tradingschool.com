import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const OrderPanel = ({ selectedAsset, onPlaceOrder, currentPrice }) => {
  const [orderType, setOrderType] = useState('market');
  const [tradeDirection, setTradeDirection] = useState('buy');
  const [quantity, setQuantity] = useState('1000');
  const [price, setPrice] = useState(currentPrice?.toString() || '1.2170');
  const [stopLoss, setStopLoss] = useState('');
  const [takeProfit, setTakeProfit] = useState('');
  const [leverage, setLeverage] = useState('1:1');

  const orderTypes = [
    { value: 'market', label: 'Market Order' },
    { value: 'limit', label: 'Limit Order' },
    { value: 'stop', label: 'Stop Order' },
    { value: 'stop-limit', label: 'Stop-Limit Order' }
  ];

  const leverageOptions = [
    { value: '1:1', label: '1:1 (No Leverage)' },
    { value: '1:10', label: '1:10' },
    { value: '1:20', label: '1:20' },
    { value: '1:50', label: '1:50' },
    { value: '1:100', label: '1:100' }
  ];

  const calculateMargin = () => {
    const qty = parseFloat(quantity) || 0;
    const prc = parseFloat(price) || 0;
    const lev = parseInt(leverage?.split(':')?.[1]) || 1;
    return ((qty * prc) / lev)?.toFixed(2);
  };

  const calculatePipValue = () => {
    const qty = parseFloat(quantity) || 0;
    return (qty * 0.0001)?.toFixed(2);
  };

  const handlePlaceOrder = () => {
    const orderData = {
      symbol: selectedAsset?.symbol,
      type: orderType,
      direction: tradeDirection,
      quantity: parseFloat(quantity),
      price: parseFloat(price),
      stopLoss: stopLoss ? parseFloat(stopLoss) : null,
      takeProfit: takeProfit ? parseFloat(takeProfit) : null,
      leverage,
      timestamp: new Date()?.toISOString()
    };

    onPlaceOrder(orderData);
    
    // Reset form
    setQuantity('1000');
    setStopLoss('');
    setTakeProfit('');
  };

  return (
    <div className="bg-white rounded-lg border p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-heading-semibold text-lg text-primary">
          Place Order
        </h3>
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-muted-foreground">Current Price:</span>
          <span className="font-mono font-semibold text-primary">
            {currentPrice || '1.2170'}
          </span>
        </div>
      </div>
      {/* Trade Direction */}
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant={tradeDirection === 'buy' ? 'success' : 'outline'}
          onClick={() => setTradeDirection('buy')}
          className="h-12"
        >
          <Icon name="TrendingUp" size={18} className="mr-2" />
          BUY
        </Button>
        <Button
          variant={tradeDirection === 'sell' ? 'destructive' : 'outline'}
          onClick={() => setTradeDirection('sell')}
          className="h-12"
        >
          <Icon name="TrendingDown" size={18} className="mr-2" />
          SELL
        </Button>
      </div>
      {/* Order Type */}
      <Select
        label="Order Type"
        options={orderTypes}
        value={orderType}
        onChange={setOrderType}
      />
      {/* Quantity */}
      <Input
        label="Quantity (Units)"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e?.target?.value)}
        placeholder="Enter quantity"
      />
      {/* Price (for limit orders) */}
      {orderType !== 'market' && (
        <Input
          label="Price"
          type="number"
          step="0.0001"
          value={price}
          onChange={(e) => setPrice(e?.target?.value)}
          placeholder="Enter price"
        />
      )}
      {/* Leverage */}
      <Select
        label="Leverage"
        options={leverageOptions}
        value={leverage}
        onChange={setLeverage}
      />
      {/* Risk Management */}
      <div className="space-y-3">
        <h4 className="font-heading font-heading-semibold text-sm text-primary">
          Risk Management
        </h4>
        
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Stop Loss"
            type="number"
            step="0.0001"
            value={stopLoss}
            onChange={(e) => setStopLoss(e?.target?.value)}
            placeholder="Optional"
          />
          <Input
            label="Take Profit"
            type="number"
            step="0.0001"
            value={takeProfit}
            onChange={(e) => setTakeProfit(e?.target?.value)}
            placeholder="Optional"
          />
        </div>
      </div>
      {/* Order Summary */}
      <div className="bg-muted rounded-lg p-3 space-y-2">
        <h4 className="font-heading font-heading-semibold text-sm text-primary">
          Order Summary
        </h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Required Margin:</span>
            <span className="font-mono">${calculateMargin()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Pip Value:</span>
            <span className="font-mono">${calculatePipValue()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Spread:</span>
            <span className="font-mono">0.8 pips</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Commission:</span>
            <span className="font-mono">$0.00</span>
          </div>
        </div>
      </div>
      {/* Educational Tip */}
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
        <div className="flex items-start space-x-2">
          <Icon name="AlertTriangle" size={16} className="text-accent mt-0.5" />
          <div>
            <h5 className="font-heading font-heading-semibold text-sm text-accent mb-1">
              Risk Management Tip
            </h5>
            <p className="text-xs text-muted-foreground">
              Always set stop-loss orders to limit potential losses. Risk no more than 2% of your account per trade.
            </p>
          </div>
        </div>
      </div>
      {/* Place Order Button */}
      <Button
        variant={tradeDirection === 'buy' ? 'success' : 'destructive'}
        fullWidth
        onClick={handlePlaceOrder}
        className="h-12 font-heading font-heading-semibold"
      >
        <Icon name={tradeDirection === 'buy' ? 'TrendingUp' : 'TrendingDown'} size={18} className="mr-2" />
        Place {tradeDirection?.toUpperCase()} Order
      </Button>
    </div>
  );
};

export default OrderPanel;