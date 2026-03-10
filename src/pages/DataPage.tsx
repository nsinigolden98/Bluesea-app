import { useState, useEffect } from 'react';
import { Wifi, Loader2, Check } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { DataPlan, NetworkProvider } from '@/types';

interface DataFormData {
  phoneNumber: string;
  networkProvider: NetworkProvider;
  dataPlanId: string;
}

const networkProviders = [
  { value: 'mtn', label: 'MTN', color: 'bg-yellow-400', textColor: 'text-black' },
  { value: 'airtel', label: 'Airtel', color: 'bg-red-500', textColor: 'text-white' },
  { value: 'glo', label: 'Glo', color: 'bg-green-500', textColor: 'text-white' },
  { value: '9mobile', label: '9mobile', color: 'bg-green-400', textColor: 'text-white' },
];

// Mock data plans - would come from API
const mockDataPlans: DataPlan[] = [
  { id: '1', name: 'Daily 50MB', size: '50MB', price: 50, validity: '1 day', networkProvider: 'mtn' },
  { id: '2', name: 'Daily 150MB', size: '150MB', price: 100, validity: '1 day', networkProvider: 'mtn' },
  { id: '3', name: 'Weekly 350MB', size: '350MB', price: 300, validity: '7 days', networkProvider: 'mtn' },
  { id: '4', name: 'Monthly 1.5GB', size: '1.5GB', price: 1000, validity: '30 days', networkProvider: 'mtn' },
  { id: '5', name: 'Monthly 3GB', size: '3GB', price: 1500, validity: '30 days', networkProvider: 'mtn' },
  { id: '6', name: 'Monthly 10GB', size: '10GB', price: 3000, validity: '30 days', networkProvider: 'mtn' },
  { id: '7', name: 'Daily 100MB', size: '100MB', price: 100, validity: '1 day', networkProvider: 'airtel' },
  { id: '8', name: 'Weekly 1GB', size: '1GB', price: 500, validity: '7 days', networkProvider: 'airtel' },
  { id: '9', name: 'Monthly 3GB', size: '3GB', price: 1500, validity: '30 days', networkProvider: 'airtel' },
];

export function DataPage() {
  const [dataPlans, setDataPlans] = useState<DataPlan[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);

  const form = useForm<DataFormData>({
    initialValues: {
      phoneNumber: '',
      networkProvider: '' as NetworkProvider,
      dataPlanId: '',
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
      dataPlanId: {
        required: true,
        message: 'Please select a data plan',
      },
    },
    onSubmit: async () => {
      setShowConfirm(true);
    },
  });

  // Filter data plans based on selected network
  useEffect(() => {
    if (form.values.networkProvider) {
      const filtered = mockDataPlans.filter(
        plan => plan.networkProvider === form.values.networkProvider
      );
      setDataPlans(filtered);
      // Reset data plan selection when network changes
      form.setValue('dataPlanId', '');
    } else {
      setDataPlans([]);
    }
  }, [form.values.networkProvider]);

  const handleConfirmPurchase = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setShowConfirm(false);
    setPurchaseComplete(true);
  };

  const selectedNetwork = networkProviders.find(
    n => n.value === form.values.networkProvider
  );

  const selectedPlan = dataPlans.find(
    plan => plan.id === form.values.dataPlanId
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
          <h1 className="text-2xl font-bold">Buy Data</h1>
          <p className="text-muted-foreground">Purchase data bundles for any network</p>
        </div>

        {/* Purchase Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Wifi className="w-5 h-5 text-bluesea-primary" />
              Data Purchase
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
                  <SelectTrigger className="h-14">
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

              {/* Data Plans */}
              {form.values.networkProvider && (
                <div className="space-y-2">
                  <Label>Select Data Plan</Label>
                  <div className="space-y-2">
                    {dataPlans.map((plan) => (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => form.setValue('dataPlanId', plan.id)}
                        className={cn(
                          'w-full p-4 rounded-xl border text-left transition-all',
                          form.values.dataPlanId === plan.id
                            ? 'border-bluesea-primary bg-bluesea-primary/5'
                            : 'border-border hover:border-bluesea-primary/50'
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold">{plan.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Valid for {plan.validity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-bluesea-primary">
                              {formatCurrency(plan.price)}
                            </p>
                            {form.values.dataPlanId === plan.id && (
                              <Check className="w-5 h-5 text-bluesea-primary ml-auto mt-1" />
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  {form.touched.dataPlanId && form.errors.dataPlanId && (
                    <p className="text-sm text-destructive">{form.errors.dataPlanId}</p>
                  )}
                </div>
              )}

              <Button
                type="submit"
                className="w-full btn-bluesea-primary"
                disabled={form.isSubmitting || !form.values.dataPlanId}
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

        {/* Confirmation Dialog */}
        <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Purchase</DialogTitle>
              <DialogDescription>
                Please review your data purchase details
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
                <span className="text-muted-foreground">Data Plan</span>
                <span className="font-semibold">{selectedPlan?.name}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-xl">
                <span className="text-muted-foreground">Data Size</span>
                <span className="font-semibold">{selectedPlan?.size}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-xl">
                <span className="text-muted-foreground">Validity</span>
                <span className="font-semibold">{selectedPlan?.validity}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-bluesea-primary/10 rounded-xl">
                <span className="font-medium">Total Amount</span>
                <span className="font-bold text-bluesea-primary text-lg">
                  {formatCurrency(selectedPlan?.price || 0)}
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
                Your data bundle has been activated
              </DialogDescription>
            </DialogHeader>
            
            <div className="text-center py-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <Wifi className="w-10 h-10 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-bluesea-primary">
                {selectedPlan?.size}
              </p>
              <p className="text-muted-foreground mt-1">
                Data sent to {form.values.phoneNumber}
              </p>
              <Badge className="mt-2" variant="secondary">
                Valid for {selectedPlan?.validity}
              </Badge>
            </div>

            <Button
              className="w-full btn-bluesea-primary"
              onClick={() => {
                setPurchaseComplete(false);
                form.reset();
              }}
            >
              Buy More Data
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
