import clsx from "clsx"

export default function Card({
  children,
  title,
  styling
}: {
  children: React.ReactNode
  title?: string
  styling?: string
}) {
  return (
    <div className={clsx("glass-card p-5 flex flex-col gap-4 2xl:h-full 2xl:p-4 2xl:gap-3 border border-white/20 rounded-xl flex-1", styling)}>
      {title && (
        <h2 className="text-lg font-bold bg-linear-to-r from-indigo-200 via-purple-300 to-pink-200 bg-clip-text text-transparent tracking-wide 2xl:text-base">
          {title}
        </h2>
      )}
      <div className="flex-1 flex flex-col min-h-0">
        {children}
      </div>
    </div>
  )
}
