import { Link, useLocation } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PageNotFound() {
  const location = useLocation();
  const pageName = location.pathname.substring(1);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-7xl font-light text-primary">404</h1>
          <div className="h-0.5 w-16 bg-border mx-auto" />
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-medium text-foreground">Page not found</h2>
          <p className="text-muted-foreground leading-relaxed">
            {pageName
              ? <>The page <span className="font-medium text-foreground">&ldquo;{pageName}&rdquo;</span> doesn&rsquo;t exist.</>
              : 'This page doesn&rsquo;t exist.'}
          </p>
        </div>

        <div className="pt-2">
          <Button asChild>
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Go home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
