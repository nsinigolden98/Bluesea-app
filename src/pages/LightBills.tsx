import { useState } from 'react';
import { Sidebar, Header } from '@/components/ui-custom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const meterTypes = ['Prepaid', 'Postpaid'];
const billers = ['IKEDC', 'EKEDC', 'AEDC', 'PHEDC', 'KEDCO', 'JEDC'];

export function LightBills() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [meterNumber, setMeterNumber] = useState('');
  const [meterType, setMeterType] = useState('');
  const [biller, setBiller] = useState('');
  const [amount, setAmount] = useState('');

  const pricePerUnit = 70;
  const units = amount ? Math.floor(Number(amount) / pricePerUnit) : 0;

  const handleContinue = () => {
    if (!meterNumber || !meterType || !biller || !amount) {
      alert('Please fill in all fields');
      return;
    }
    alert(`Purchasing ${units} units for meter ${meterNumber}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          title="Light Bills" 
          subtitle="Buy Smarter & Cheaper"
          onMenuClick={() => setSidebarOpen(true)} 
        />

        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Meter Profile */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                      Meter Profile
                    </h3>
                    <span className="text-xs text-slate-400">Meter not linked</span>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="meterNumber">Meter Number</Label>
                      <Input
                        id="meterNumber"
                        placeholder="Enter meter number"
                        value={meterNumber}
                        onChange={(e) => setMeterNumber(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Meter Type</Label>
                      <Select value={meterType} onValueChange={setMeterType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select meter type" />
                        </SelectTrigger>
                        <SelectContent>
                          {meterTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Biller</Label>
                      <Select value={biller} onValueChange={setBiller}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Biller" />
                        </SelectTrigger>
                        <SelectContent>
                          {billers.map((b) => (
                            <SelectItem key={b} value={b}>
                              {b}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Purchase Units */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                    Purchase Units
                  </h3>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount (₦)</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Price per unit</span>
                        <span className="font-medium">₦{pricePerUnit}/unit</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Units you'll receive</span>
                        <span className="font-medium text-sky-500">{units}</span>
                      </div>
                    </div>

                    <Button 
                      onClick={handleContinue}
                      className="w-full rounded-full bg-sky-500 hover:bg-sky-600 py-6"
                      disabled={!meterNumber || !meterType || !biller || !amount}
                    >
                      Continue Payment
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
