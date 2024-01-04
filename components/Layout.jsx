import Sidebar from './Sidebar';

export default function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full p-6 h-full">{children}</main>
    </div>
  );
}
