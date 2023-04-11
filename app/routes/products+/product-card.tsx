import { useState } from "react";

type ProductCardProps = {
    children?: React.ReactNode
};

export function ProductImage({ image }: { image: string }) {
    return (
        <div className="w-full">
            <img 
            className="aspect-square object-cover max-w-full"
            src={image}
            alt="product"
            />
        </div> 
    );
}

export function ProductTitle({ 
    title,
    isTruncated = false
}: { 
    title: string,
    isTruncated?: boolean
}) {
    return <h3 className={`font-bold ${isTruncated ? "truncate" : ""}`}>{title}</h3>;
}   

export function ProductDescription({
    description,
    characterCount,
    children
}: { 
    description: string;
    characterCount?: number;
    children?: React.ReactNode;
}) {
    return (
        <p>
            {description.substring(0, characterCount)}
            {children}
        </p>
    )
}

export function ProductDescriptionSnippet({ 
    description,
}: { 
    description: string;
}) {
    const [isTruncated, setIsTruncated] = useState(true);

    const handleToggleTruncated = () => setIsTruncated(!isTruncated);
    
    return (
        <div className="flex items-start flex-1">
            <ProductDescription
            description={description}
            characterCount={isTruncated ? 50 : undefined}>
                <button 
                className="inline ml-1 bg-gray-200 px-1 rounded-sm"
                onClick={handleToggleTruncated}>
                    {isTruncated ? "more" : "less"}
                </button>
            </ProductDescription>
        </div>
    )
}

export function ProductPrice({ price }: { price: number }) {
    return (
        <p className="text-sm">
            ${price}
        </p>
    )
}

export function ProductCategory({ category }: { category: string }) {
    return (
        <p className="bg-teal-200 px-1 rounded-sm w-fit">
            {category}
        </p>
    )
}

export function ProductCard({
    children
}: ProductCardProps) {
    return (
        <div className="flex flex-col w-40 rounded-sm
        drop-shadow-sm bg-white p-2">
            {children}
        </div>
    )
}

ProductCard.Title = ProductTitle;
ProductCard.Image = ProductImage;
ProductCard.Description = ProductDescriptionSnippet;
ProductCard.Price = ProductPrice;
ProductCard.Category = ProductCategory;

export default ProductCard;