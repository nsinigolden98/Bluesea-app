import { useState } from 'react';
import { Zap, Loader2 } from 'lucide-react';
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

interface ElectricityFormData {
  meterNumber: string;
  disco: string;
  meterType: string;
  amount: string;
  phoneNumber: string;
}

const discoProviders = [
  { value: 'ikedc', label: 'Ikeja Electric (IKEDC)' },
  { value: 'ekedc', label: 'Eko Electric (EKEDC)' },
  { value: 'aedc', label: 'Abuja Electric (AEDC)' },
  { value: 'phedc', label: 'Port Harcourt Electric (PHEDC)' },
  { value: 'kedco', label: 'Kano Electric (KEDCO)' },
  { value: 'ibedc', label: 'Ibadan Electric (IBEDC)' },
  { value: 'jbedc', label: 'Jos Electric (JBEDC)' },
  { value: 'kaedco', label: 'Kaduna Electric (KAEDCO)' },
  { value: 'yedc', label: 'Yola Electric (YEDC)' },
  { value: 'bedc', label: 'Benin Electric (BEDC)' },
  { value: 'eedc', label: 'Enugu Electric (EEDC)' },
];

const meterTypes = [
  { value: 'prepaid', label: 'Prepaid' },
  { value: 'postpaid', label: 'Postpaid' },
];

const quickAmounts = [1000, 2000, 5000, 10000, 20000];

export function ElectricityPage() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);

  const form = useForm<ElectricityFormData>({
    initialValues: {
      meterNumber: '',
      disco: '',
      meterType: '',
      amount: '',
      phoneNumber: '',
    },
    validationSchema: {
      meterNumber: {
        required: true,
        minLength: 10,
        message: 'Please enter a valid meter number',
      },
      disco: {
        required: true,
        message: 'Please select a disco provider',
      },
      meterType: {
        required: true,
        message: 'Please select meter type',
      },
      amount: {
        required: true,
        validate: (value: string) => {
          const num = parseFloat(value);
          return num >= 500 || 'Minimum amount is ₦500';
        },
      },
      phoneNumber: {
        required: true,
        pattern: /^[0-9]{11}$/,
        message: 'Please enter a valid 11-digit phone number',
      },
    },
    onSubmit: async () => {
      setShowConfirm(true);
    },
  });

  const handleConfirmPurchase = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setShowConfirm(false);
    setPurchaseComplete(true);
  };

  const selectedDisco = discoProviders.find(
    d => d.value === form.values.disco
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
          <h1 className="text-2xl font-bold">Buy Electricity</h1>
          <p className="text-muted-foreground">Pay your electricity bills instantly</p>
        </div>

        {/* Purchase Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Electricity Payment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit} className="space-y-5">
              {/* DISCO Provider */}
              <div className="space-y-2">
                <Label>Electricity Provider (DISCO)</Label>
                <Select
                  value={form.values.disco}
                  onValueChange={(value) => form.setValue('disco', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {discoProviders.map((provider) => (
                      <SelectItem key={provider.value} value={provider.value}>
                        {provider.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.touched.disco && form.errors.disco && (
                  <p className="text-sm text-destructive">{form.errors.disco}</p>
                )}
              </div>

              {/* Meter Type */}
              <div className="space-y-2">
                <Label>Meter Type</Label>
                <Select
                  value={form.values.meterType}
                  onValueChange={(value) => form.setValue('meterType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select meter type" />
                  </SelectTrigger>
                  <SelectContent>
                    {meterTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.touched.meterType && form.errors.meterType && (
                  <p className="text-sm text-destructive">{form.errors.meterType}</p>
                )}
              </div>

              {/* Meter Number */}
              <div className="space-y-2">
                <Label htmlFor="meterNumber">Meter Number</Label>
                <Input
                  id="meterNumber"
                  name="meterNumber"
                  type="text"
                  placeholder="Enter your meter number"
                  value={form.values.meterNumber}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
                {form.touched.meterNumber && form.errors.meterNumber && (
                  <p className="text-sm text-destructive">{form.errors.meterNumber}</p>
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
                  placeholder="Enter amount (min ₦500)"
                  value={form.values.amount}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  min={500}
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
              <li>Minimum purchase amount is ₦500</li>
              <li>Token will be sent via SMS</li>
              <li>Transaction fees may apply</li>
            </ul>
          </CardContent>
        </Card>

        {/* Confirmation Dialog */}
        <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Payment</DialogTitle>
              <DialogDescription>
                Please review your electricity payment details
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="flex justify-between items-center p-3 bg-muted rounded-xl">
                <span className="text-muted-foreground">Provider</span>
                <span className="font-semibold">{selectedDisco?.label}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-xl">
                <span className="text-muted-foreground">Meter Type</span>
                <span className="font-semibold capitalize">{form.values.meterType}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-xl">
                <span className="text-muted-foreground">Meter Number</span>
                <span className="font-semibold">{form.values.meterNumber}</span>
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
                  'Confirm Payment'
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Success Dialog */}
        <Dialog open={purchaseComplete} onOpenChange={setPurchaseComplete}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center">Payment Successful!</DialogTitle>
              <DialogDescription className="text-center">
                Your electricity token has been generated
              </DialogDescription>
            </DialogHeader>
            
            <div className="text-center py-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <Zap className="w-10 h-10 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-bluesea-primary">
                {formatCurrency(parseFloat(form.values.amount || '0'))}
              </p>
              <p className="text-muted-foreground mt-1">
                Token sent to {form.values.phoneNumber}
              </p>
              <div className="mt-4 p-4 bg-muted rounded-xl">
                <p className="text-xs text-muted-foreground mb-1">Token</p>
                <p className="font-mono text-lg font-bold tracking-wider">1234-5678-9012-3456</p>
              </div>
            </div>

            <Button
              className="w-full btn-bluesea-primary"
              onClick={() => {
                setPurchaseComplete(false);
                form.reset();
              }}
            >
              Pay Another Bill
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
