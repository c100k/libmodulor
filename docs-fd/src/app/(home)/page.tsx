import Link from 'next/link';

export default function HomePage() {
    return (
        <main className="flex flex-1 flex-col justify-center text-center gap-3">
            <div>
                <h1 className="mb-4 text-2xl font-bold">libmodulor</h1>
                <h2>
                    An opinionated TypeScript library to create business
                    oriented applications
                </h2>
            </div>

            <p className="text-fd-muted-foreground">
                Read{' '}
                <Link
                    href="/docs"
                    className="text-fd-foreground font-semibold underline"
                >
                    the docs
                </Link>
                .
            </p>
        </main>
    );
}
