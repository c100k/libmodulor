import Link from 'next/link';

export default function HomePage() {
    return (
        <main className="flex flex-1 flex-col justify-center text-center gap-6">
            <div>
                <h1 className="mb-4 text-4xl font-bold">libmodulor</h1>
                <h2 className="text-2xl">
                    A TypeScript library to create business oriented
                    applications
                </h2>
            </div>

            <p className="text-fd-muted-foreground">
                <Link href="/docs" className="text-2xl font-semibold underline">
                    read the docs
                </Link>
            </p>
        </main>
    );
}
