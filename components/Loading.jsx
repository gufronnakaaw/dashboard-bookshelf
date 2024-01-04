import { Spinner, Typography } from '@material-tailwind/react';

export default function Loading() {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 z-[9999] bg-white">
      <div className="align-center relative top-[50%] flex translate-y-[-50%] flex-col items-center">
        <div className="flex items-center">
          <Typography className="ml-1 text-[20px] font-extrabold text-gray-900">
            Dashboard Bookshelf
          </Typography>
        </div>
        <Spinner className="h-8 w-8" color="gray" />
      </div>
    </div>
  );
}
