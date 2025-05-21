import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProductCategoriesProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export default function ProductCategories({
  activeCategory,
  setActiveCategory,
}: ProductCategoriesProps) {
  const categories = [
    "Electronics",
    "Fashion",
    "Books",
    "Home",
    "Toys",
    "Sports",
    "Beauty",
    "Automotive",
    "Sports",
    "Beauty",
    "Automotive",
  ];

  return (
    <div className=" flex justify-center">
      <Carousel className="max-w-[150px] md:max-w-4xl  px-1 py-3">
        <CarouselContent className="-ml-2">
          {categories.map((category, index) => (
            <CarouselItem key={index} className="pl-2 basis-auto flex-shrink-0">
              <Button
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 text-sm whitespace-nowrap transition-colors ${
                  activeCategory === category
                    ? "bg-orange-500 hover:bg-orange-600 text-white cursor-pointer"
                    : "bg-white text-gray-700 hover:bg-gray-100 cursor-pointer"
                }`}
              >
                {category}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious variant={"link"} />
        <CarouselNext variant={"link"} />
      </Carousel>
    </div>
  );
}
