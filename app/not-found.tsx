import Link from "next/link";
import { MoveRight, BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    // h-screen sahifani aniq ekran bo'yi bilan cheklaydi, overflow-hidden scrollni taqiqlaydi
    <div className="h-screen w-full flex flex-col items-center justify-center bg-[#FDFCF6] px-6 overflow-hidden">
      {/* Visual Section - flex-1 va max-h orqali joyni tejaymiz */}
      <div className="relative flex-1 max-h-[40%] w-full flex justify-center items-center select-none">
        {/* Background 404 - Ekran kichrayganda matn ham kichrayadi */}
        <h1 className="text-[25vw] md:text-[15rem] font-black text-[#111111] leading-none tracking-tighter opacity-5">
          404
        </h1>

        {/* Floating Cards - Mobil uchun o'lchamlar kichraytirildi */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 sm:gap-4 pointer-events-none">
          <div className="w-10 h-16 sm:w-16 sm:h-24 bg-white rounded-lg shadow-sm border border-[#EBE6DD] p-2 flex flex-col items-center justify-center -rotate-12 translate-y-4">
            <span className="text-xl sm:text-3xl">📘</span>
          </div>

          <div className="w-12 h-20 sm:w-18 sm:h-28 bg-white rounded-xl shadow-xl border border-[#EBE6DD] p-3 flex flex-col items-center justify-center z-10 scale-110 -translate-y-2">
            <span className="text-2xl sm:text-4xl text-[#DA5239]">?</span>
            <span className="text-[8px] sm:text-[10px] mt-1 font-bold text-[#111]">
              Missing
            </span>
          </div>

          <div className="w-10 h-16 sm:w-16 sm:h-24 bg-white rounded-lg shadow-sm border border-[#EBE6DD] p-2 flex flex-col items-center justify-center rotate-12 translate-y-4">
            <span className="text-xl sm:text-3xl">📕</span>
          </div>
        </div>
      </div>

      {/* Text Content - Oradagi marginlarni (mb-*) kamaytirdik */}
      <div className="flex-none max-w-2xl mx-auto mb-6 text-center">
        <div className="inline-block px-3 py-1 rounded-full bg-[#DA5239]/10 text-[#DA5239] text-[10px] font-bold tracking-widest uppercase mb-3">
          Page Not Found
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] leading-tight mb-4">
          Oops! This book is <br className="hidden sm:block" />
          <span className="text-[#DA5239]">off the shelf.</span>
        </h2>

        <p className="text-sm sm:text-base text-[#666666] leading-relaxed max-w-sm mx-auto">
          The page you are looking for doesn`t exist. Maybe it was already
          swapped?
        </p>
      </div>

      {/* Action Buttons - Tugmalar o'lchami mobil uchun optimallashdi */}
      <div className="flex-none flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xs sm:max-w-md pb-10">
        <Link
          href="/"
          className="group flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-[#111111] text-white text-sm font-bold rounded-full shadow-lg hover:bg-black transition-all"
        >
          Back to Home
          <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          href="/catalog"
          className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-white text-[#111111] text-sm font-bold rounded-full border border-[#EBE6DD] hover:bg-[#F3F0E8] transition-all"
        >
          <BookOpen className="w-4 h-4" />
          Browse Catalog
        </Link>
      </div>
    </div>
  );
}
