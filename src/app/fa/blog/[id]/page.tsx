"use client";

import { use, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  Calendar,
  Clock,
  User,
  Heart,
  MessageCircle,
  Eye,
  Share2,
  Bookmark,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleTheme } from "@/store/slices/themeSlice";

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
  body: string[];
}

// In a real app this would come from a CMS or API.
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
    body: [
      "هزینه‌ سفرهای روزانه می‌تواند به سرعت سرسام‌آور شود. در این مقاله چند ترفند ساده ولی مؤثر را با هم مرور می‌کنیم.",
      "اولین قدم استفاده از سرویس Pool است؛ شما با هم‌مسیران خود سفر را به اشتراک می‌گذارید و هزینه به صورت چشمگیری کاهش پیدا می‌کند.",
      "دومین نکته انتخاب ساعت سفر است. در ساعات غیرپیک نرخ‌ها معمولاً پایین‌تر هستند و مدت زمان سفر نیز کاهش پیدا می‌کند.",
      "در نهایت فعال کردن کیف پول و استفاده از کدهای تخفیف ماهانه می‌تواند تا ۱۵٪ از هزینه‌ها کم کند.",
    ],
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
    body: [
      "ایمنی مسافر مهم‌ترین اولویت یک راننده حرفه‌ای است. در این مقاله ده قانون طلایی را مرور می‌کنیم که رعایت آن‌ها می‌تواند زندگی نجات دهد.",
      "۱) همیشه فاصله ایمن را حفظ کنید. ۲) از تلفن همراه استفاده نکنید. ۳) از کمربند ایمنی استفاده کنید.",
      "۴) به سرعت‌های مجاز پایبند باشید. ۵) قبل از حرکت، خودرو را بازرسی کنید. ۶) در شرایط بد آب‌وهوا محتاط‌تر باشید.",
      "۷) خواب کافی داشته باشید. ۸) راحتی مسافر را در نظر بگیرید. ۹) با مسافر محترمانه برخورد کنید. ۱۰) قوانین RideX را رعایت کنید.",
    ],
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
    body: [
      "هوش مصنوعی در سال‌های اخیر تحول بزرگی در صنعت حمل‌ونقل ایجاد کرده است.",
      "مسیریابی هوشمند با در نظر گرفتن ترافیک لحظه‌ای، الگوهای آب‌وهوایی و رفتار کاربر، بهترین مسیر را انتخاب می‌کند.",
      "RideX از مدل‌های یادگیری ماشین برای تطبیق راننده و مسافر در کمترین زمان ممکن استفاده می‌کند.",
      "این تنها شروع راه است؛ آینده‌ای روشن در انتظار حمل‌ونقل هوشمند است.",
    ],
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
    body: [
      "کیف پول RideX راه ساده‌تر و سریع‌تری برای پرداخت‌های روزانه است.",
      "۱) سرعت بالا در پرداخت ۲) دریافت کش‌بک ۳) امنیت بالا ۴) مدیریت تراکنش‌ها ۵) تخفیف‌های ویژه",
      "همه‌ی این مزایا فقط با یک‌بار شارژ کیف پول قابل استفاده هستند.",
    ],
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
    body: [
      "ترافیک یکی از بزرگ‌ترین چالش‌های شهرهای امروز است.",
      "بر اساس داده‌های ما، استفاده از RideX Pool می‌تواند تا ۱۸٪ از خودروهای شخصی روی خیابان‌ها بکاهد.",
      "این یعنی هوای پاک‌تر، زمان کم‌تر در ترافیک و رضایت بیشتر شهروندان.",
    ],
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
    body: [
      "کدهای تخفیف RideX را می‌توانید در بخش کیف پول وارد کنید.",
      "پس از وارد کردن کد، تخفیف به صورت خودکار روی سفر بعدی شما اعمال می‌شود.",
      "هر ماه کدهای جدیدی برای کاربران فعال ارسال می‌شود — اعلان‌ها را روشن نگه دارید!",
    ],
  },
];

export default function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const post = posts.find((p) => p.id === id);
  const dispatch = useAppDispatch();
  const resolved = useAppSelector((s) => s.theme.resolved);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  if (!post) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-6" dir="rtl">
        <div className="text-center space-y-4">
          <p className="text-5xl">🔍</p>
          <h1 className="text-2xl font-bold text-fg">مقاله یافت نشد</h1>
          <Link href="/fa/blog">
            <Button>بازگشت به وبلاگ</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col" dir="rtl">
      {/* Header */}
      <div className="px-4 pt-6 pb-2 flex items-center justify-between max-w-3xl w-full mx-auto">
        <Link href="/fa/blog" className="flex items-center gap-2 no-underline text-fg2 hover:text-fg">
          <ArrowRight size={18} className="rotate-180" />
          <span className="text-sm font-semibold">بازگشت به وبلاگ</span>
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => dispatch(toggleTheme())}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-[10px] bg-glass border border-bdr flex items-center justify-center text-fg2 hover:text-fg hover:border-bdr2 transition-all"
          >
            {resolved === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button
            onClick={() => setBookmarked((v) => !v)}
            className="w-9 h-9 rounded-[10px] bg-glass border border-bdr flex items-center justify-center text-fg2 hover:text-fg hover:border-bdr2 transition-all"
            aria-label="Bookmark"
          >
            <Bookmark size={15} className={bookmarked ? "fill-fg text-fg" : ""} />
          </button>
          <button
            onClick={() => navigator.share?.({ title: post.title, url: location.href }).catch(() => {})}
            className="w-9 h-9 rounded-[10px] bg-glass border border-bdr flex items-center justify-center text-fg2 hover:text-fg hover:border-bdr2 transition-all"
            aria-label="Share"
          >
            <Share2 size={15} />
          </button>
        </div>
      </div>

      <article className="flex-1 px-4 py-6 max-w-3xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Cover */}
          <div className="relative w-full h-56 sm:h-72 rounded-2xl border border-bdr bg-gradient-to-br from-blue-500/15 via-purple-500/10 to-fuchsia-500/15 flex items-center justify-center overflow-hidden">
            <div className="text-7xl sm:text-8xl">{post.image}</div>
            <span className="absolute top-4 start-4 px-3 py-1 rounded-full bg-bg2/80 backdrop-blur border border-bdr text-xs font-bold text-fg2">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-black text-fg leading-tight">
            {post.title}
          </h1>
          <p className="text-base sm:text-lg text-fg3 leading-relaxed">{post.excerpt}</p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-fg4 border-y border-bdr py-3">
            <span className="flex items-center gap-1.5">
              <User size={12} />
              {post.author}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar size={12} />
              {post.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} />
              {post.readTime}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Eye size={12} />
              {post.views.toLocaleString()} بازدید
            </span>
          </div>

          {/* Body */}
          <div className="prose-rtl space-y-5">
            {post.body.map((para, i) => (
              <p
                key={i}
                className="text-[15px] sm:text-base leading-[2] text-fg2"
                style={{ fontFamily: "Vazirmatn, sans-serif" }}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-bdr">
            <button
              onClick={() => setLiked((v) => !v)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition-all ${
                liked
                  ? "bg-red-500/10 border-red-400/40 text-red-400"
                  : "bg-glass border-bdr text-fg2 hover:text-fg hover:border-bdr2"
              }`}
            >
              <Heart size={14} className={liked ? "fill-red-400" : ""} />
              {liked ? post.likes + 1 : post.likes}
            </button>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-glass border border-bdr text-fg3 text-sm">
              <MessageCircle size={14} />
              {post.comments} دیدگاه
            </div>
            <div className="flex-1" />
            <Link href="/fa/blog">
              <Button variant="ghost" size="sm">مقالات بیشتر</Button>
            </Link>
          </div>
        </motion.div>
      </article>
    </div>
  );
}