"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Grid, List, Heart, Star, RotateCcw } from "lucide-react"

// Define the shape of the filter values
export interface DocumentFilterValues {
  searchQuery: string;
  category: string;
  department: string;
  priority: string;
  time: string;
  showFavoritesOnly: boolean;
  showMandatoryOnly: boolean;
}

// Define the props for our new component
interface DocumentFiltersProps {
  onFilterChange: (filters: DocumentFilterValues) => void;
  onViewChange: (view: 'grid' | 'list') => void;
  // Use a more specific type for visibleFilters
  visibleFilters?: (keyof DocumentFilterValues)[];
  resultCount: number;
}

// Lists of options for the dropdowns
const categories = ["Semua", "Panduan", "Template", "SOP", "Laporan", "Strategi", "Checklist"];
const departments = ["Semua", "Pendayagunaan", "Penghimpunan", "SDM", "IT", "Keuangan", "Marketing", "Audit"];
const priorities = ["Semua", "high", "medium", "low"];
const timeFilters = ["Semua", "today", "week", "month"];

const initialFilters: DocumentFilterValues = {
  searchQuery: "",
  category: "Semua",
  department: "Semua",
  priority: "Semua",
  time: "Semua",
  showFavoritesOnly: false,
  showMandatoryOnly: false,
};

export function DocumentFilters({ onFilterChange, onViewChange, visibleFilters = ['category', 'department', 'priority', 'favorites', 'mandatory'], resultCount }: DocumentFiltersProps) {
  const [filters, setFilters] = useState<DocumentFilterValues>(initialFilters);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleFilterChange = (key: keyof DocumentFilterValues, value: string | boolean) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleViewChange = (view: 'grid' | 'list') => {
      setViewMode(view);
      onViewChange(view);
  }

  const handleReset = () => {
    setFilters(initialFilters);
    onFilterChange(initialFilters);
  }

  // FIX: Use a more specific type for the parameter
  const isFilterVisible = (filterName: keyof DocumentFilterValues) => visibleFilters.includes(filterName);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5" />
                <span>Filter & Pencarian</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Filter
            </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Cari dokumen..."
            value={filters.searchQuery}
            onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
            className="pl-10 h-11"
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-4">
            {isFilterVisible('category') && (
                <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
                <SelectTrigger className="w-full sm:w-auto flex-1"><SelectValue placeholder="Kategori" /></SelectTrigger>
                <SelectContent>{categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}</SelectContent>
                </Select>
            )}
            {isFilterVisible('department') && (
                <Select value={filters.department} onValueChange={(value) => handleFilterChange('department', value)}>
                <SelectTrigger className="w-full sm:w-auto flex-1"><SelectValue placeholder="Departemen" /></SelectTrigger>
                <SelectContent>{departments.map(dept => <SelectItem key={dept} value={dept}>{dept}</SelectItem>)}</SelectContent>
                </Select>
            )}
            {isFilterVisible('priority') && (
                <Select value={filters.priority} onValueChange={(value) => handleFilterChange('priority', value)}>
                <SelectTrigger className="w-full sm:w-auto flex-1"><SelectValue placeholder="Prioritas" /></SelectTrigger>
                <SelectContent>{priorities.map(p => <SelectItem key={p} value={p}>{p === "Semua" ? "Semua" : p.charAt(0).toUpperCase() + p.slice(1)}</SelectItem>)}</SelectContent>
                </Select>
            )}
            {isFilterVisible('time') && (
                <Select value={filters.time} onValueChange={(value) => handleFilterChange('time', value)}>
                <SelectTrigger className="w-full sm:w-auto flex-1"><SelectValue placeholder="Waktu" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Semua">Semua Waktu</SelectItem>
                  <SelectItem value="today">Hari Ini</SelectItem>
                  <SelectItem value="week">Minggu Ini</SelectItem>
                  <SelectItem value="month">Bulan Ini</SelectItem>
                </SelectContent>
                </Select>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {isFilterVisible('showFavoritesOnly') && (
                <Button variant={filters.showFavoritesOnly ? "secondary" : "outline"} size="sm" onClick={() => handleFilterChange('showFavoritesOnly', !filters.showFavoritesOnly)}>
                  <Heart className={`w-4 h-4 mr-2 ${filters.showFavoritesOnly ? 'text-red-500 fill-current' : ''}`} />
                  Favorit
                </Button>
              )}
              {isFilterVisible('showMandatoryOnly') && (
                <Button variant={filters.showMandatoryOnly ? "secondary" : "outline"} size="sm" onClick={() => handleFilterChange('showMandatoryOnly', !filters.showMandatoryOnly)}>
                  <Star className={`w-4 h-4 mr-2 ${filters.showMandatoryOnly ? 'text-yellow-500 fill-current' : ''}`} />
                  Wajib Saja
                </Button>
              )}
              <Badge variant="outline">{resultCount} dokumen</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant={viewMode === 'grid' ? 'default' : 'outline'} size="sm" onClick={() => handleViewChange('grid')}><Grid className="w-4 h-4" /></Button>
              <Button variant={viewMode === 'list' ? 'default' : 'outline'} size="sm" onClick={() => handleViewChange('list')}><List className="w-4 h-4" /></Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}