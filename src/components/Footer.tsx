import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Footer = () => {
  const actualYear = new Date().getFullYear();
  return (
    <footer className="bg-white dark:bg-black h-20 relative">
      <MaxWidthWrapper>
        <div className="border-t border-gray-200" />

        <div className="h-full flex flex-col md:flex-row md:justify-between justify-center items-center">
          <div className="text-center md:text-left pb-2 md:pb-0">
            <p className="text-sm text-muted-foreground">
              &copy; {actualYear} Todos los derechos reservados.
            </p>
          </div>

          <div className="flex items-center justify-center">
            <div className="flex space-x-8">
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-gray-600 dark:hover:text-gray-100"
              >
                Terminos y condiciones
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-gray-600 dark:hover:text-gray-100"
              >
                Política y privacidad
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-gray-600 dark:hover:text-gray-100"
              >
                Política sobre cookies
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
