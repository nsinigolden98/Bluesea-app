import { useState } from 'react';
import { Smartphone, Loader2 } from 'lucide-react';
import { MainLayout } from '@/layouts';
import { useForm } from '@/hooks';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

type NetworkProvider = 'mtn' | 'airtel' | 'glo' | '9mobile';

interface AirtimeFormData {
  phoneNumber: string;
  networkProvider: NetworkProvider;
  amount: string;
}

const networkProviders = [
  { value: 'mtn', label: 'MTN', color: 'bg-yellow-400', textColor: 'text-black' },
  { value: 'airtel', label: 'Airtel', color: 'bg-red-500', textColor: 'text-white' },
  { value: 'glo', label: 'Glo', color: 'bg-green-500', textColor: 'text-white' },
  { value: '9mobile', label: '9mobile', color: 'bg-green-400', textColor: 'text-white' },
];

const quickAmounts = [100, 200, 500, 1000, 2000, 5000];

export function AirtimePage() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);

  const form = useForm<AirtimeFormData>({
    initialValues: {
      phoneNumber: '',
      networkProvider: '' as NetworkProvider,
      amount: '',
    },
    validationSchema: {
      phoneNumber: {
        required: true,
        pattern: /^[0-9]{11}$/,
        message: 'Please enter a valid 11-digit phone number',
      },
      networkProvider: {
        required: true,
        message: 'Please select a network provider',
      },
      amount: {
        required: true,
        validate: (value: string) => {
          const num = parseFloat(value);
          return num >= 50 || 'Minimum amount is ₦50';
        },
      },
    },
    onSubmit: async () => {
      setShowConfirm(true);
    },
  });

  const handleConfirmPurchase = async () => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setShowConfirm(false);
    setPurchaseComplete(true);
  };

  const selectedNetwork = networkProviders.find(
    n => n.value === form.values.networkProvider
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };

  return (
    <MainLayout>
      <div className="space-y-6 max-w-lg mx-auto">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Buy Airtime</h1>
          <p className="text-muted-foreground">Purchase airtime for any network</p>
        </div>

        {/* Purchase Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-bluesea-primary" />
              Airtime Purchase
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit} className="space-y-5">
              {/* Network Provider */}
              <div className="space-y-2">
                <Label>Network Provider</Label>
                <Select
                  value={form.values.networkProvider}
                  onValueChange={(value) => form.setValue('networkProvider', value as NetworkProvider)}
                >
                  <SelectTrigger className={cn(
                    'h-14',
                    selectedNetwork && selectedNetwork.color
                  )}>
                    <SelectValue placeholder="Select network">
                      {selectedNetwork && (
                        <div className="flex items-center gap-3">
                          <span className={cn(
                            'px-3 py-1 rounded-lg text-sm font-semibold',
                            selectedNetwork.color,
                            selectedNetwork.textColor
                          )}>
                            {selectedNetwork.label}
                          </span>
                        </div>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {networkProviders.map((provider) => (
                      <SelectItem key={provider.value} value={provider.value}>
                        <div className="flex items-center gap-3">
                          <span className={cn(
                            'px-3 py-1 rounded-lg text-sm font-semibold',
                            provider.color,
                            provider.textColor
                          )}>
                            {provider.label}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.touched.networkProvider && form.errors.networkProvider && (
                  <p className="text-sm text-destructive">{form.errors.networkProvider}</p>
                )}
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  placeholder="e.g., 08012345678"
                  value={form.values.phoneNumber}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  maxLength={11}
                />
                {form.touched.phoneNumber && form.errors.phoneNumber && (
                  <p className="text-sm text-destructive">{form.errors.phoneNumber}</p>
                )}
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  placeholder="Enter amount (min ₦50)"
                  value={form.values.amount}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  min={50}
                />
                {form.touched.amount && form.errors.amount && (
                  <p className="text-sm text-destructive">{form.errors.amount}</p>
                )}
              </div>

              {/* Quick Amounts */}
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Quick Select</Label>
                <div className="grid grid-cols-3 gap-2">
                  {quickAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => form.setValue('amount', amount.toString())}
                      className={cn(
                        'py-2 px-3 rounded-xl text-sm font-medium border transition-all',
                        form.values.amount === amount.toString()
                          ? 'bg-bluesea-primary text-white border-bluesea-primary'
                          : 'bg-card border-border hover:border-bluesea-primary/50'
                      )}
                    >
                      ₦{amount.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full btn-bluesea-primary"
                disabled={form.isSubmitting}
              >
                {form.isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Continue'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="bg-muted/50 border-0">
          <CardContent className="p-4">
            <h4 className="font-medium text-sm mb-2">Note:</h4>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Minimum purchase amount is ₦50</li>
              <li>Airtime is delivered instantly</li>
              <li>Transaction fees may apply</li>
            </ul>
          </CardContent>
        </Card>

        {/* Confirmation Dialog */}
        <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Purchase</DialogTitle>
              <DialogDescription>
                Please review your airtime purchase details
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="flex justify-between items-center p-3 bg-muted rounded-xl">
                <span className="text-muted-foreground">Network</span>
                <span className="font-semibold">{selectedNetwork?.label}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-xl">
                <span className="text-muted-foreground">Phone Number</span>
                <span className="font-semibold">{form.values.phoneNumber}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-xl">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-semibold text-bluesea-primary">
                  {formatCurrency(parseFloat(form.values.amount || '0'))}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowConfirm(false)}
                disabled={isProcessing}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 btn-bluesea-primary"
                onClick={handleConfirmPurchase}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Confirm Purchase'
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Success Dialog */}
        <Dialog open={purchaseComplete} onOpenChange={setPurchaseComplete}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center">Purchase Successful!</DialogTitle>
              <DialogDescription className="text-center">
                Your airtime has been delivered successfully
              </DialogDescription>
            </DialogHeader>
            
            <div className="text-center py-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <Smartphone className="w-10 h-10 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-bluesea-primary">
                {formatCurrency(parseFloat(form.values.amount || '0'))}
              </p>
              <p className="text-muted-foreground mt-1">
                Airtime sent to {form.values.phoneNumber}
              </p>
            </div>

            <Button
              className="w-full btn-bluesea-primary"
              onClick={() => {
                setPurchaseComplete(false);
                form.reset();
              }}
            >
              Buy More Airtime
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
