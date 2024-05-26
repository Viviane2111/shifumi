export default function Home() {
  return (
    <div>
      <main className="custom-ubuntu-font flex flex-col justify-center items-center min-h-screen py-16">
        <div>
          <div className="w-20 mb-5">
            <img src="/next.svg" alt="" />
          </div>
          <h1 className="text-6xl md:text-6xl lg:text-7xl font-semibold leading-normal">
            Welcome to{" "}
            <a
              className="text-blue-500 hover:underline"
              href="https://nextjs.org"
            >
              Next.js!
            </a>
          </h1>
        </div>
      </main>
    </div>
  );
}
