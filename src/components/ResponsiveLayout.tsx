interface ResponsiveLayoutProps {
  mobile: React.ReactNode;
  desktop: React.ReactNode;
}

export default function ResponsiveLayout({
  mobile,
  desktop,
}: ResponsiveLayoutProps) {
  return (
    <>
      <div className="block md:hidden">{mobile}</div>

      <div className="hidden md:block">{desktop}</div>
    </>
  );
}
