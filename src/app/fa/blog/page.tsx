// src/app/fa/blog/page.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Calendar,
  Clock,
  User,
  Tag,
  ArrowLeft,
  ArrowRight,
  Eye,
  Heart,
  MessageCircle,
  Search,
  TrendingUp,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { useAppSelector } from "@/store";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  views: number;
  likes: number;
  comments: number;
  featured?: boolean;
}

export default function BlogPage() {
  const user = useAppSelector((state) => state.auth.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("همه");

  const posts: BlogPost[] = [
    {
      id: "1",
      title: "نکاتی برای سفرهای اقتصادی با RideX",
      excerpt: "با استفاده از ترفندهای ساده، هزینه سفرهای روزانه خود را تا ۳۰٪ کاهش دهید.",
      category: "راهنمای سفر",
      author: "علی محمدی",
      date: "۲۱ خرداد ۱۴۰۴",
      readTime: "۵ دقیقه",
      image: "📝",
      views: 1240,
      likes: 89,
      comments: 34,
      featured: true,
    },
    {
      id: "2",
      title: "رانندگی ایمن: ۱۰ قانون طلایی برای رانندگان",
      excerpt: "راهنمایی‌های ضروری برای رانندگان RideX برای افزایش ایمنی و رضایت مسافران.",
      category: "ایمنی",
      author: "سارا احمدی",
      date: "۱۸ خرداد ۱۴۰۴",
      readTime: "۷ دقیقه",
      image: "🛡️",
      views: 980,
      likes: 67,
      comments: 23,
    },
    {
      id: "3",
      title: "هوش مصنوعی در حمل‌ونقل: آینده‌ای که هم‌اکنون آغاز شده",
      excerpt: "چگونه فناوری هوش مصنوعی تجربه سفر را متحول کرده و مسیرهای هوشمند را ممکن ساخته است.",
      category: "فناوری",
      author: "رضا کریمی",
      date: "۱۵ خرداد ۱۴۰۴",
      readTime: "۶ دقیقه",
      image: "🤖",
      views: 2150,
      likes: 156,
      comments: 45,
      featured: true,
    },
    {
      id: "4",
      title: "۵ مزیت استفاده از کیف پول RideX",
      excerpt: "آشنایی با مزایای استفاده از کیف پول الکترونیکی برای پرداخت‌های سریع و امن.",
      category: "کیف پول",
      author: "مریم حسینی",
      date: "۱۲ خرداد ۱۴۰۴",
      readTime: "۴ دقیقه",
      image: "💳",
      views: 750,
      likes: 42,
      comments: 18,
    },
    {
      id: "5",
      title: "تأثیر RideX بر کاهش ترافیک شهری",
      excerpt: "بررسی داده‌ها نشان می‌دهد که سرویس‌های اشتراک سفر چگونه به کاهش ترافیک کمک کرده‌اند.",
      category: "شهر",
      author: "احمد رضایی",
      date: "۹ خرداد ۱۴۰۴",
      readTime: "۸ دقیقه",
      image: "🌆",
      views: 630,
      likes: 38,
      comments: 12,
    },
    {
      id: "6",
      title: "نحوه استفاده از کدهای تخفیف RideX",
      excerpt: "راهنمای کامل استفاده از کدهای تخفیف و پیشنهادات ویژه برای سفرهای ارزان‌تر.",
      category: "تخفیف",
      author: "علی محمدی",
      date: "۶ خرداد ۱۴۰۴",
      readTime: "۳ دقیقه",
      image: "🎁",
      views: 1890,
      likes: 120,
      comments: 56,
    },
  ];

  const categories = ["همه", ...new Set(posts.map((p) => p.category))];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.includes(searchTerm) ||
      post.excerpt.includes(searchTerm) ||
      post.author.includes(searchTerm);
    const matchesCategory = selectedCategory === "همه" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = posts.filter((p) => p.featured);

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col">
      {/* Header */}
      <div className="px-4 pt-6 pb-2 flex items-center justify-between">
        <Link href="/fa" className="flex items-center gap-2 no-underline">
          <div className="w-8 h-8 rounded-xl bg-[var(--fg)] flex items-center justify-center text-sm font-black text-[var(--bg)]">
            R
          </div>
          <span className="text-lg font-extrabold text-[var(--fg)] tracking-tight">RideX</span>
        </Link>
        <div className="flex items-center gap-2">
          {user && (
            <Link href="/fa/passenger/dashboard">
              <Button variant="ghost" size="sm">
                داشبورد
              </Button>
            </Link>
          )}
          <Link href="/fa">
            <Button variant="ghost" size="sm">
              بازگشت
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex-1 px-4 py-6 max-w-4xl mx-auto w-full space-y-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <BookOpen size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[var(--fg)]">وبلاگ RideX</h1>
          <p className="text-base text-[var(--fg3)] max-w-md mx-auto">
            آخرین اخبار، راهنماها و مقالات تخصصی در دنیای حمل‌ونقل هوشمند
          </p>
        </motion.div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-yellow-400" />
              <h2 className="text-sm font-bold text-[var(--fg)]">پست‌های ویژه</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {featuredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  whileHover={{ y: -2 }}
                  className="bg-gradient-to-r from-blue-500/5 to-purple-500/5 border border-[var(--bdr)] rounded-xl p-5 hover:bg-[var(--glass)] transition-all cursor-pointer"
                >
                  <div className="text-4xl mb-3">{post.image}</div>
                  <h3 className="text-base font-bold text-[var(--fg)] mb-1 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-[var(--fg3)] line-clamp-2 mb-3">{post.excerpt}</p>
                  <div className="flex flex-wrap items-center gap-3 text-[10px] text-[var(--fg4)]">
                    <span className="flex items-center gap-1">
                      <User size={10} />
                      {post.author}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar size={10} />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock size={10} />
                      {post.readTime}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[var(--glass)] text-[10px] text-[var(--fg4)]">
                      {post.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Input
                placeholder="جستجو در مقالات..."
                leftIcon={<Search size={14} />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? "bg-[var(--fg)] text-[var(--bg)]"
                      : "bg-[var(--glass)] text-[var(--fg3)] hover:text-[var(--fg)] border border-[var(--bdr)]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Posts Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12 bg-[var(--glass)] rounded-2xl border border-[var(--bdr)]">
              <p className="text-[var(--fg3)]">هیچ مقاله‌ای با این فیلترها یافت نشد</p>
            </div>
          ) : (
            filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 2 }}
                className="bg-[var(--glass)] border border-[var(--bdr)] rounded-xl p-4 hover:bg-[var(--glass2)] transition-all cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="text-4xl sm:text-5xl flex-shrink-0 text-center sm:text-left">
                    {post.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded-full bg-[var(--glass)] text-[10px] text-[var(--fg4)]">
                        {post.category}
                      </span>
                      {post.featured && (
                        <span className="px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 text-[10px]">
                          ویژه
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-[var(--fg)] line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-[var(--fg3)] line-clamp-2 mt-1">{post.excerpt}</p>
                    <div className="flex flex-wrap items-center gap-3 text-[10px] text-[var(--fg4)] mt-2">
                      <span className="flex items-center gap-1">
                        <User size={10} />
                        {post.author}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar size={10} />
                        {post.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock size={10} />
                        {post.readTime}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Eye size={10} />
                        {post.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart size={10} className="text-red-400" />
                        {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle size={10} />
                        {post.comments}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="flex-shrink-0">
                    مطالعه
                    <ArrowLeft size={14} className="mr-1" />
                  </Button>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Footer */}
        <div className="pt-4 border-t border-[var(--bdr)] flex justify-between text-xs text-[var(--fg4)]">
          <span>{filteredPosts.length} مقاله</span>
          <span>RideX Blog • ۱۴۰۴</span>
        </div>
      </div>
    </div>
  );
}