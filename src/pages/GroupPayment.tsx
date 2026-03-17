import { useState } from 'react';
import { Sidebar, Header } from '@/components/ui-custom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { groupPayments } from '@/data';
import { cn } from '@/lib/utils';
import { 
  Plus, 
  Copy, 
  CheckCircle2, 
  UserPlus,
  X,
  Wallet
} from 'lucide-react';

interface NewGroupForm {
  name: string;
  description: string;
  targetAmount: string;
  contributors: string[];
}

export function GroupPayment() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<typeof groupPayments[0] | null>(null);
  const [newGroup, setNewGroup] = useState<NewGroupForm>({
    name: '',
    description: '',
    targetAmount: '',
    contributors: [''],
  });

  const handleCreateGroup = () => {
    alert('Group created successfully!');
    setShowCreateModal(false);
    setNewGroup({ name: '', description: '', targetAmount: '', contributors: [''] });
  };

  const addContributor = () => {
    setNewGroup({ ...newGroup, contributors: [...newGroup.contributors, ''] });
  };

  const removeContributor = (index: number) => {
    const updated = newGroup.contributors.filter((_, i) => i !== index);
    setNewGroup({ ...newGroup, contributors: updated });
  };

  const updateContributor = (index: number, value: string) => {
    const updated = [...newGroup.contributors];
    updated[index] = value;
    setNewGroup({ ...newGroup, contributors: updated });
  };

  const copyInviteLink = (groupId: string) => {
    navigator.clipboard.writeText(`https://bluesea.com/group/${groupId}`);
    alert('Invite link copied!');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          title="Group Payments" 
          subtitle="Split Bills with Friends & Family"
          onMenuClick={() => setSidebarOpen(true)} 
        />

        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Create Group Button */}
            <Button 
              onClick={() => setShowCreateModal(true)}
              className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 py-6 shadow-lg shadow-sky-500/25"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create New Group Payment
            </Button>

            {/* Active Groups */}
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-white mb-4">Active Groups</h3>
              <div className="grid gap-4">
                {groupPayments.filter(g => g.status === 'active').map((group) => (
                  <div 
                    key={group.id} 
                    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedGroup(group)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-slate-800 dark:text-white">{group.name}</h4>
                        <p className="text-sm text-slate-500">{group.description}</p>
                      </div>
                      <span className="px-3 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 text-xs font-medium rounded-full">
                        Active
                      </span>
                    </div>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-500">Progress</span>
                        <span className="font-medium">
                          ₦{group.currentAmount.toLocaleString()} / ₦{group.targetAmount.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-sky-400 to-sky-500 rounded-full transition-all"
                          style={{ width: `${(group.currentAmount / group.targetAmount) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Contributors */}
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {group.contributors.slice(0, 4).map((contributor) => (
                          <div 
                            key={contributor.id}
                            className={cn(
                              'w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center text-xs font-medium',
                              contributor.status === 'paid' 
                                ? 'bg-green-100 text-green-600'
                                : 'bg-slate-100 text-slate-500'
                            )}
                            title={contributor.name}
                          >
                            {contributor.name[0]}
                          </div>
                        ))}
                        {group.contributors.length > 4 && (
                          <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 flex items-center justify-center text-xs font-medium">
                            +{group.contributors.length - 4}
                          </div>
                        )}
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          copyInviteLink(group.id);
                        }}
                        className="flex items-center gap-1 text-sm text-sky-500 hover:text-sky-600"
                      >
                        <Copy className="w-4 h-4" />
                        Invite
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Completed Groups */}
            {groupPayments.filter(g => g.status === 'completed').length > 0 && (
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-white mb-4">Completed</h3>
                <div className="grid gap-4">
                  {groupPayments.filter(g => g.status === 'completed').map((group) => (
                    <div 
                      key={group.id} 
                      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 opacity-70"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-800 dark:text-white">{group.name}</h4>
                            <p className="text-sm text-slate-500">₦{group.targetAmount.toLocaleString()} collected</p>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-medium rounded-full">
                          Completed
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Create Group Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-slate-900 p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="font-semibold text-slate-800 dark:text-white">Create Group Payment</h3>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <Label>Group Name</Label>
                <Input
                  placeholder="e.g., Weekend Data Bundle"
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Input
                  placeholder="What is this payment for?"
                  value={newGroup.description}
                  onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Target Amount (₦)</Label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={newGroup.targetAmount}
                  onChange={(e) => setNewGroup({ ...newGroup, targetAmount: e.target.value })}
                />
              </div>

              <div className="space-y-3">
                <Label>Contributors</Label>
                {newGroup.contributors.map((contributor, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Phone number or email"
                      value={contributor}
                      onChange={(e) => updateContributor(index, e.target.value)}
                    />
                    {newGroup.contributors.length > 1 && (
                      <button 
                        onClick={() => removeContributor(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  onClick={addContributor}
                  className="w-full"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Contributor
                </Button>
              </div>

              <Button 
                onClick={handleCreateGroup}
                className="w-full bg-sky-500 hover:bg-sky-600 py-6"
                disabled={!newGroup.name || !newGroup.targetAmount}
              >
                Create Group
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Group Detail Modal */}
      {selectedGroup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-slate-900 p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="font-semibold text-slate-800 dark:text-white">{selectedGroup.name}</h3>
              <button 
                onClick={() => setSelectedGroup(null)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Progress */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-500">Progress</span>
                  <span className="font-medium">
                    {Math.round((selectedGroup.currentAmount / selectedGroup.targetAmount) * 100)}%
                  </span>
                </div>
                <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-sky-400 to-sky-500 rounded-full"
                    style={{ width: `${(selectedGroup.currentAmount / selectedGroup.targetAmount) * 100}%` }}
                  />
                </div>
                <p className="text-center mt-2 text-slate-600 dark:text-slate-400">
                  ₦{selectedGroup.currentAmount.toLocaleString()} of ₦{selectedGroup.targetAmount.toLocaleString()}
                </p>
              </div>

              {/* Contributors List */}
              <div>
                <h4 className="font-medium text-slate-800 dark:text-white mb-3">Contributors</h4>
                <div className="space-y-2">
                  {selectedGroup.contributors.map((contributor) => (
                    <div 
                      key={contributor.id}
                      className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center">
                          <span className="font-medium text-sky-600">{contributor.name[0]}</span>
                        </div>
                        <div>
                          <p className="font-medium text-slate-800 dark:text-white">{contributor.name}</p>
                          <p className="text-sm text-slate-500">₦{contributor.amount.toLocaleString()}</p>
                        </div>
                      </div>
                      <span className={cn(
                        'px-3 py-1 text-xs font-medium rounded-full',
                        contributor.status === 'paid'
                          ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
                      )}>
                        {contributor.status === 'paid' ? 'Paid' : 'Pending'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button 
                  variant="outline"
                  onClick={() => copyInviteLink(selectedGroup.id)}
                  className="flex-1"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Link
                </Button>
                <Button 
                  onClick={() => {
                    alert('Payment feature coming soon!');
                  }}
                  className="flex-1 bg-sky-500 hover:bg-sky-600"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Pay Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
