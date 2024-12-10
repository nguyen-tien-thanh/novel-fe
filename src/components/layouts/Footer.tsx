export const Footer = () => {
  return (
    <footer className="footer footer-center bg-base-300 text-base-content p-2 lg:p-4">
      <aside>
        <p className="flex flex-col lg:flex-row lg:gap-1">
          <span className="text-xs lg:text-base">Copyright © {new Date().getFullYear()}</span>
          <span className="hidden lg:block"> - </span>
          <span className="text-xs lg:text-base">All right reserved by AiTruyen</span>
        </p>
      </aside>
    </footer>
  )
}
