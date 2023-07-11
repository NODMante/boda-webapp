import { forwardRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const MenuItem = forwardRef(({ Icon, text, url }, ref) => {
  const router = useRouter();
  return url ? (
    <Link ref={ref} href={url} className="flex items-center space-x-3 w-full">
      <Icon className="text-blue-200 font-light w-5 h-5" />
      <h6
        className={`${
          router.pathname === url ? "text-white" : "text-blue-200"
        } hover:text-white duration-500 tracking-wide`}
      >
        {text}
      </h6>
    </Link>
  ) : (
    <div ref={ref} className="flex justify-center items-center space-x-3">
      <Icon className="text-blue-200 font-light w-5 h-5" />
      <h6
        className={`${
          router.pathname === url ? "text-white" : "text-blue-200"
        } hover:text-white duration-500 tracking-wide`}
      >
        {text}
      </h6>
    </div>
  );
});

MenuItem.displayName = "MenuItem";

export default MenuItem;
