'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Clock, Route as RouteIcon, Plus, X } from 'lucide-react';

interface Location {
  id: string;
  address: string;
  complaint: string;
  priority: 'High' | 'Medium' | 'Low';
}

const sampleLocations: Location[] = [
  {
    id: 'L001',
    address: '123 Main St, Downtown',
    complaint: 'Network outage affecting office building',
    priority: 'High'
  },
  {
    id: 'L002', 
    address: '456 Oak Ave, Midtown',
    complaint: 'Equipment maintenance required',
    priority: 'Medium'
  },
  {
    id: 'L003',
    address: '789 Pine Rd, Uptown',
    complaint: 'Service quality issue reported',
    priority: 'Low'
  }
];

const optimizedRoute = [
  { stop: 1, address: '123 Main St, Downtown', eta: '9:00 AM', duration: '45 min' },
  { stop: 2, address: '456 Oak Ave, Midtown', eta: '10:15 AM', duration: '30 min' },
  { stop: 3, address: '789 Pine Rd, Uptown', eta: '11:30 AM', duration: '20 min' },
];

export default function RouteOptimizationPage() {
  const [locations, setLocations] = useState<Location[]>(sampleLocations);
  const [newLocation, setNewLocation] = useState({ address: '', complaint: '' });
  const [isOptimized, setIsOptimized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const addLocation = () => {
    if (newLocation.address && newLocation.complaint) {
      const location: Location = {
        id: `L${String(locations.length + 1).padStart(3, '0')}`,
        address: newLocation.address,
        complaint: newLocation.complaint,
        priority: 'Medium'
      };
      setLocations([...locations, location]);
      setNewLocation({ address: '', complaint: '' });
    }
  };

  const removeLocation = (id: string) => {
    setLocations(locations.filter(loc => loc.id !== id));
    setIsOptimized(false);
  };

  const optimizeRoute = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsOptimized(true);
    }, 2000);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout 
      title="Route Optimization" 
      description="Optimize field service routes for efficient complaint resolution"
    >
      <div className="space-y-6">
        {/* Add Locations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Add Complaint Locations</CardTitle>
              <CardDescription>
                Enter addresses where field service is required
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  placeholder="Enter address or location"
                  value={newLocation.address}
                  onChange={(e) => setNewLocation({ ...newLocation, address: e.target.value })}
                  className="flex-1"
                />
                <Input
                  placeholder="Brief complaint description"
                  value={newLocation.complaint}
                  onChange={(e) => setNewLocation({ ...newLocation, complaint: e.target.value })}
                  className="flex-1"
                />
                <Button onClick={addLocation}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Current Locations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Service Locations ({locations.length})</CardTitle>
                <CardDescription>Locations requiring field service</CardDescription>
              </div>
              <Button 
                onClick={optimizeRoute} 
                disabled={locations.length < 2 || isLoading}
                className="min-w-[140px]"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <Navigation className="mr-2 h-4 w-4" />
                    Optimize Route
                  </>
                )}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {locations.map((location, index) => (
                  <motion.div
                    key={location.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{location.address}</span>
                          <Badge className={getPriorityColor(location.priority)}>
                            {location.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{location.complaint}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeLocation(location.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Optimized Route Results */}
        {isOptimized && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Route Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <RouteIcon className="mr-2 h-5 w-5" />
                    Optimized Route
                  </CardTitle>
                  <CardDescription>Suggested order for maximum efficiency</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {optimizedRoute.map((stop, index) => (
                      <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
                        <div className="w-8 h-8 bg-green-100 text-green-800 rounded-full flex items-center justify-center font-medium">
                          {stop.stop}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{stop.address}</p>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              ETA: {stop.eta}
                            </span>
                            <span>Duration: {stop.duration}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Route Summary</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-blue-700 dark:text-blue-300">Total Distance:</span>
                        <p className="font-medium">24.5 miles</p>
                      </div>
                      <div>
                        <span className="text-blue-700 dark:text-blue-300">Estimated Time:</span>
                        <p className="font-medium">3.5 hours</p>
                      </div>
                      <div>
                        <span className="text-blue-700 dark:text-blue-300">Fuel Saved:</span>
                        <p className="font-medium text-green-600">18%</p>
                      </div>
                      <div>
                        <span className="text-blue-700 dark:text-blue-300">Time Saved:</span>
                        <p className="font-medium text-green-600">45 min</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Interactive Map Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle>Route Map</CardTitle>
                  <CardDescription>Visual representation of the optimized route</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <MapPin className="w-12 h-12 text-slate-400 mx-auto" />
                      <div>
                        <p className="text-slate-600 dark:text-slate-400 font-medium">Interactive Map</p>
                        <p className="text-sm text-slate-500 dark:text-slate-500">
                          Map integration would show the optimized route with markers
                        </p>
                      </div>
                      <Button variant="outline">
                        <Navigation className="mr-2 h-4 w-4" />
                        Open in Maps
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {/* Route Statistics */}
        {isOptimized && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Optimization Benefits</CardTitle>
                <CardDescription>Improvements compared to unoptimized routing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">18%</div>
                    <div className="text-sm text-muted-foreground">Fuel Savings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">45 min</div>
                    <div className="text-sm text-muted-foreground">Time Saved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">8.2 miles</div>
                    <div className="text-sm text-muted-foreground">Less Distance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">$42</div>
                    <div className="text-sm text-muted-foreground">Cost Reduction</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}