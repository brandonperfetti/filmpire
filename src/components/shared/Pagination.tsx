import { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";

interface PaginationProps {
  pageNumber: number;
  totalPages: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const Pagination = ({ pageNumber, totalPages, setPage }: PaginationProps) => {
  const handlePrev = () => {
    if (pageNumber !== 1) {
      setPage((prev: number) => prev - 1);
    }
  };
  const handleNext = () => {
    if (pageNumber !== totalPages) {
      setPage((prev: number) => prev + 1);
    }
  };

  if (totalPages === 0) {
    return null;
  }

  return (
    <div className="flex w-full items-center justify-center gap-2">
      <Button
        disabled={pageNumber === 1}
        onClick={handlePrev}
        className="light-border-2 btn flex min-h-[36px] items-center justify-center gap-2 border"
      >
        <p className="body-medium text-dark200_light800">Prev</p>
      </Button>
      <div className="flex items-center justify-center rounded-md bg-primary-500 px-3.5 py-2">
        <p className="body-semibold text-light-900">{pageNumber}</p>
      </div>
      <Button
        disabled={pageNumber === totalPages}
        onClick={handleNext}
        className="light-border-2 btn flex min-h-[36px] items-center justify-center gap-2 border"
      >
        <p className="body-medium text-dark200_light800">Next</p>
      </Button>
    </div>
  );
};

export default Pagination;
