// Dummy left-side poster slot — swap the gradient block for a real designed
// poster image (refreshed roughly every 10 days) once one is ready.
export function PosterAd() {
  return (
    <div className="w-full shrink-0 lg:w-56">
      <div className="flex aspect-[3/4] w-full flex-col items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-5 text-center text-white shadow-card lg:sticky lg:top-24">
        <span className="text-3xl">🎓</span>
        <p className="text-sm font-extrabold leading-snug">Admissions Open 2026</p>
        <p className="text-xs text-white/80">Apply to top colleges — free counselling</p>
      </div>
    </div>
  );
}
