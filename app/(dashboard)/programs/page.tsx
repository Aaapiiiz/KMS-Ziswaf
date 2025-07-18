"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Heart, DollarSign, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

// Mock data for program categories, summarizing data from other pages
const programCategories = [
  {
    id: "scholarships",
    name: "Program Beasiswa",
    description: "Program yang berfokus pada penyediaan dana pendidikan untuk pelajar dan mahasiswa berprestasi atau dari keluarga kurang mampu.",
    icon: GraduationCap,
    stats: {
      programCount: 3,
      totalBudget: "Rp 5.5 Miliar",
      totalRecipients: "1,000+",
    },
    tags: ["Pendidikan", "Mahasiswa", "Prestasi", "Dhuafa"],
    link: "/programs/scholarships",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    id: "social-aid",
    name: "Program Bantuan Sosial",
    description: "Program bantuan langsung untuk meringankan beban masyarakat yang membutuhkan, termasuk bantuan pangan, kesehatan, dan darurat.",
    icon: Heart,
    stats: {
      programCount: 4,
      totalBudget: "Rp 2.75 Miliar",
      totalRecipients: "8,750+",
    },
    tags: ["Pangan", "Kesehatan", "Darurat", "Infrastruktur"],
    link: "/programs/social-aid",
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
  }
];

// Calculate overall stats
const totalProgramCount = programCategories.reduce((sum, cat) => sum + cat.stats.programCount, 0);
const totalBudget = "Rp 8.25 Miliar";
const totalRecipients = "9,750+";

export default function ProgramsPage() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Program ZISWAF</h1>
        <p className="text-gray-600">
          Ikhtisar kategori program utama yang dikelola oleh organisasi.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Kategori Program</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{programCategories.length}</div>
            <p className="text-xs text-muted-foreground">{totalProgramCount} program berjalan</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Anggaran Program</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBudget}</div>
            <p className="text-xs text-muted-foreground">Total dana yang dialokasikan</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Penerima Manfaat</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRecipients}</div>
            <p className="text-xs text-muted-foreground">Total individu & keluarga</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Program Aktif</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Program sedang berjalan</p>
          </CardContent>
        </Card>
      </div>

      {/* Program Categories Grid */}
      <div className="space-y-4">
         <h2 className="text-2xl font-semibold tracking-tight">Kategori Program</h2>
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {programCategories.map((category) => (
            <Card key={category.id} className="hover:shadow-lg transition-shadow flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${category.bgColor}`}>
                    <category.icon className={`h-6 w-6 ${category.color}`} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      <Link href={category.link} className="hover:underline">
                        {category.name}
                      </Link>
                    </CardTitle>
                    <CardDescription className="mt-1">{category.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-grow space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center border-t border-b py-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Total Program</p>
                    <p className="text-lg font-bold">{category.stats.programCount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Anggaran</p>
                    <p className="text-lg font-bold">{category.stats.totalBudget}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Penerima</p>
                    <p className="text-lg font-bold">{category.stats.totalRecipients}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Area Fokus</p>
                  <div className="flex flex-wrap gap-2">
                    {category.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={category.link}>
                    Lihat Detail Kategori
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}