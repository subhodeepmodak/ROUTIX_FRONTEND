'use client';

import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Users, 
  AlertTriangle,
  Plus
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const statsData = [
  {
    title: 'Total Complaints',
    value: '1,247',
    change: '+12%',
    icon: FileText,
    color: 'text-blue-600',
  },
  {
    title: 'Resolved',
    value: '967',
    change: '+8%',
    icon: CheckCircle,
    color: 'text-green-600',
  },
  {
    title: 'Pending',
    value: '280',
    change: '-5%',
    icon: Clock,
    color: 'text-yellow-600',
  },
  {
    title: 'Avg. Resolution Time',
    value: '2.4 hrs',
    change: '-15%',
    icon: TrendingUp,
    color: 'text-purple-600',
  },
];

const pieData = [
  { name: 'Technical', value: 35, color: '#3b82f6' },
  { name: 'Billing', value: 25, color: '#ef4444' },
  { name: 'Service', value: 20, color: '#22c55e' },
  { name: 'Account', value: 15, color: '#f59e0b' },
  { name: 'Other', value: 5, color: '#8b5cf6' },
];

const trendData = [
  { name: 'Mon', complaints: 45, resolved: 38 },
  { name: 'Tue', complaints: 52, resolved: 43 },
  { name: 'Wed', complaints: 48, resolved: 41 },
  { name: 'Thu', complaints: 61, resolved: 52 },
  { name: 'Fri', complaints: 55, resolved: 48 },
  { name: 'Sat', complaints: 32, resolved: 28 },
  { name: 'Sun', complaints: 28, resolved: 24 },
];

const recentComplaints = [
  {
    id: 'CP-001',
    customer: 'Sarah Johnson',
    subject: 'Login issues with mobile app',
    priority: 'High',
    status: 'In Progress',
    department: 'Technical',
    time: '2 hours ago',
  },
  {
    id: 'CP-002',
    customer: 'Mike Chen',
    subject: 'Billing discrepancy in monthly statement',
    priority: 'Medium',
    status: 'Pending',
    department: 'Billing',
    time: '4 hours ago',
  },
  {
    id: 'CP-003',
    customer: 'Emily Davis',
    subject: 'Service interruption in downtown area',
    priority: 'High',
    status: 'Resolved',
    department: 'Service',
    time: '6 hours ago',
  },
];

export default function DashboardPage() {
  return (
    <DashboardLayout 
      title="Dashboard" 
      description="Welcome back! Here's what's happening with your complaints today."
    >
      <div className="space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                      {stat.change} from last week
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Complaint
                </Button>
                <Button variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Departments
                </Button>
                <Button variant="outline">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Priority Queue
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Complaints by Category */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Complaints by Category</CardTitle>
                <CardDescription>Distribution of complaint types</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {pieData.map((item) => (
                    <div key={item.name} className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Weekly Trends */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Weekly Trends</CardTitle>
                <CardDescription>Complaints received vs resolved</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="complaints" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="resolved" stroke="#22c55e" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Complaints */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Complaints</CardTitle>
              <CardDescription>Latest complaint submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentComplaints.map((complaint) => (
                  <div key={complaint.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium">{complaint.customer}</p>
                          <p className="text-sm text-muted-foreground">{complaint.subject}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        complaint.priority === 'High' ? 'bg-red-100 text-red-800' :
                        complaint.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {complaint.priority}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        complaint.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                        complaint.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {complaint.status}
                      </span>
                      <span className="text-muted-foreground">{complaint.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}