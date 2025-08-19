'use client';

import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import { TrendingUp, TrendingDown, Users, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const categoryData = [
  { name: 'Technical', complaints: 450, resolved: 380, pending: 70 },
  { name: 'Billing', complaints: 320, resolved: 290, pending: 30 },
  { name: 'Service', complaints: 280, resolved: 250, pending: 30 },
  { name: 'Account', complaints: 180, resolved: 160, pending: 20 },
  { name: 'Other', complaints: 120, resolved: 100, pending: 20 },
];

const departmentData = [
  { name: 'IT Support', resolved: 92, total: 100 },
  { name: 'Finance', resolved: 85, total: 100 },
  { name: 'Operations', resolved: 88, total: 100 },
  { name: 'Customer Service', resolved: 78, total: 100 },
  { name: 'HR', resolved: 90, total: 100 },
];

const responseTimeData = [
  { month: 'Jan', avgTime: 3.2, target: 2.0 },
  { month: 'Feb', avgTime: 2.8, target: 2.0 },
  { month: 'Mar', avgTime: 2.4, target: 2.0 },
  { month: 'Apr', avgTime: 2.1, target: 2.0 },
  { month: 'May', avgTime: 1.9, target: 2.0 },
  { month: 'Jun', avgTime: 1.8, target: 2.0 },
];

const heatmapData = [
  { day: 'Mon', hour: '9AM', value: 45 },
  { day: 'Mon', hour: '12PM', value: 65 },
  { day: 'Mon', hour: '3PM', value: 35 },
  { day: 'Tue', hour: '9AM', value: 52 },
  { day: 'Tue', hour: '12PM', value: 78 },
  { day: 'Tue', hour: '3PM', value: 42 },
  { day: 'Wed', hour: '9AM', value: 48 },
  { day: 'Wed', hour: '12PM', value: 71 },
  { day: 'Wed', hour: '3PM', value: 38 },
];

const pieColors = ['#3b82f6', '#ef4444', '#22c55e', '#f59e0b', '#8b5cf6'];

const kpis = [
  {
    title: 'Total Complaints',
    value: '1,247',
    change: '+12%',
    isPositive: false,
    icon: AlertTriangle,
  },
  {
    title: 'Resolution Rate',
    value: '89.5%',
    change: '+5.2%',
    isPositive: true,
    icon: CheckCircle,
  },
  {
    title: 'Avg Response Time',
    value: '1.8 hrs',
    change: '-23%',
    isPositive: true,
    icon: Clock,
  },
  {
    title: 'Customer Satisfaction',
    value: '4.2/5',
    change: '+0.3',
    isPositive: true,
    icon: Users,
  },
];

export default function AnalyticsPage() {
  return (
    <DashboardLayout 
      title="Analytics Dashboard" 
      description="Comprehensive insights and metrics for complaint management"
    >
      <div className="space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, index) => {
            const Icon = kpi.icon;
            const TrendIcon = kpi.isPositive ? TrendingUp : TrendingDown;
            return (
              <motion.div
                key={kpi.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {kpi.title}
                    </CardTitle>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{kpi.value}</div>
                    <div className={`flex items-center text-xs ${
                      kpi.isPositive ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <TrendIcon className="h-3 w-3 mr-1" />
                      {kpi.change} from last month
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Complaints by Category */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Complaints by Category</CardTitle>
                <CardDescription>Total vs resolved complaints by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={categoryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="complaints" fill="#3b82f6" name="Total" />
                    <Bar dataKey="resolved" fill="#22c55e" name="Resolved" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Department Performance */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
                <CardDescription>Resolution rate by department</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentData} layout="horizontal" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Resolution Rate']} />
                    <Bar dataKey="resolved" fill="#22c55e" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Response Time Trend */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Average Response Time Trend</CardTitle>
                <CardDescription>Monthly trend vs target (2.0 hours)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={responseTimeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} hrs`, '']} />
                    <Line 
                      type="monotone" 
                      dataKey="avgTime" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      name="Actual"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="target" 
                      stroke="#ef4444" 
                      strokeDasharray="5 5"
                      name="Target"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Complaints Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Complaint Volume Distribution</CardTitle>
                <CardDescription>Breakdown of complaints by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="complaints"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {categoryData.map((item, index) => (
                    <div key={item.name} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: pieColors[index % pieColors.length] }} 
                      />
                      <span className="text-sm">{item.name}</span>
                      <span className="text-sm text-muted-foreground">({item.complaints})</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Weekly Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>New Complaints:</span>
                  <span className="font-medium">156</span>
                </div>
                <div className="flex justify-between">
                  <span>Resolved:</span>
                  <span className="font-medium text-green-600">142</span>
                </div>
                <div className="flex justify-between">
                  <span>Pending:</span>
                  <span className="font-medium text-yellow-600">14</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Technical Issues</span>
                  <span className="font-medium">45%</span>
                </div>
                <div className="flex justify-between">
                  <span>Billing</span>
                  <span className="font-medium">28%</span>
                </div>
                <div className="flex justify-between">
                  <span>Service</span>
                  <span className="font-medium">18%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Performance Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Resolution Rate:</span>
                  <span className="font-medium text-green-600">89.5%</span>
                </div>
                <div className="flex justify-between">
                  <span>Target:</span>
                  <span className="font-medium">85%</span>
                </div>
                <div className="flex justify-between">
                  <span>Response Time:</span>
                  <span className="font-medium text-green-600">1.8hrs</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}