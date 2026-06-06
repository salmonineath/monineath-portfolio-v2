export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#070b14] py-8 text-center space-y-1.5">
      <p className="font-mono text-xs text-gray-600">
        $ exit <span className="text-green-500/70">— process finished with exit code 0</span>
      </p>
      <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Monineath. All rights reserved.</p>
    </footer>
  )
}
