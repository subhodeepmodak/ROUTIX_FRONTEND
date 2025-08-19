'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Calendar,
  User,
  FileText
} from 'lucide-react';

const complaints = [
  {
    id: 'CP-001',
    customer: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    subject: 'Login issues with mobile app',
    category: 'Technical',
    priority: 'High',
    status: 'In Progress',
    department: 'IT Support',
    date: '2024-01-15',
    description: 'User is experiencing difficulties logging into the mobile application. Error message appears when entering credentials.',
  },
  {
    id: 'CP-002',
    customer: 'Mike Chen',
    email: 'mike.chen@email.com',
    subject: 'Billing discrepancy in monthly statement',
    category: 'Billing',
    priority: 'Medium',
    status: 'Pending',
    department: 'Finance',
    date: '2024-01-14',
    description: 'Customer reports incorrect charges on their monthly billing statement for December 2023.',
  },
  {
    id: 'CP-003',
    customer: 'Emily Davis',
    email: 'emily.d@email.com',
    subject: 'Service interruption in downtown area',
    category: 'Service',
    priority: 'High',
    status: 'Resolved',
    department: 'Operations',
    date: '2024-01-13',
    description: 'Service outage reported in downtown area affecting multiple customers. Issue has been resolved.',
  },
  {
    id: 'CP-004',
    customer: 'David Wilson',
    email: 'david.w@email.com',
    subject: 'Account access problems',
    category: 'Account',
    priority: 'Low',
    status: 'Pending',
    department: 'Customer Service',
    date: '2024-01-12',
    description: 'Customer unable to access account dashboard. Password reset not working.',
  },
];

export default function ComplaintsPage() {
  const [selectedComplaint, setSelectedComplaint] = useState<typeof complaints[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || complaint.status.toLowerCase() === statusFilter;
    const matchesPriority = priorityFilter === 'all' || complaint.priority.toLowerCase() === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'in progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'pending': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <DashboardLayout 
      title="Complaint Management" 
      description="View, manage, and track customer complaints"
    >
      <div className="space-y-6">
        {/* Filters and Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>All Complaints</CardTitle>
                  <CardDescription>
                    {filteredComplaints.length} of {complaints.length} complaints
                  </CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      File New Complaint
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>File New Complaint</DialogTitle>
                      <DialogDescription>
                        Create a new customer complaint entry
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Customer Name</label>
                        <Input placeholder="Enter customer name" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Email</label>
                        <Input type="email" placeholder="Enter email address" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Subject</label>
                        <Input placeholder="Brief description of the issue" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Description</label>
                        <textarea 
                          className="w-full p-3 border rounded-md" 
                          rows={4}
                          placeholder="Detailed description of the complaint"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Priority</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button className="w-full">Submit Complaint</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search complaints..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Complaints Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredComplaints.map((complaint) => (
                    <TableRow key={complaint.id}>
                      <TableCell className="font-medium">{complaint.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{complaint.customer}</div>
                          <div className="text-sm text-muted-foreground">{complaint.email}</div>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{complaint.subject}</TableCell>
                      <TableCell>{complaint.category}</TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(complaint.priority)}>
                          {complaint.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(complaint.status)}>
                          {complaint.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{complaint.department}</TableCell>
                      <TableCell>{complaint.date}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedComplaint(complaint)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Complaint Details - {complaint.id}</DialogTitle>
                              </DialogHeader>
                              {selectedComplaint && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Customer</label>
                                      <p className="font-medium">{selectedComplaint.customer}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Email</label>
                                      <p>{selectedComplaint.email}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Category</label>
                                      <p>{selectedComplaint.category}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Department</label>
                                      <p>{selectedComplaint.department}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Priority</label>
                                      <Badge className={getPriorityColor(selectedComplaint.priority)}>
                                        {selectedComplaint.priority}
                                      </Badge>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Status</label>
                                      <Badge className={getStatusColor(selectedComplaint.status)}>
                                        {selectedComplaint.status}
                                      </Badge>
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">Subject</label>
                                    <p className="font-medium">{selectedComplaint.subject}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">Description</label>
                                    <p>{selectedComplaint.description}</p>
                                  </div>
                                  <div className="flex space-x-2 pt-4">
                                    <Button>Mark as Resolved</Button>
                                    <Button variant="outline">Reassign</Button>
                                    <Button variant="outline">Add Notes</Button>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}