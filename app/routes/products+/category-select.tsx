import { Form } from "@remix-run/react";
import { useState } from "react";

export default function CategoriesSelect({
    categories,
    value,
}: {
    categories: string[],
    value: string | null,
}) {
    const [currentCategory, setCurrentCategory] = useState(value || "none");

    return (
        <Form
        reloadDocument 
        method="get">
            <select 
            className="w-fit"
            name="category"
            value={currentCategory}
            onChange={(e) => setCurrentCategory(e.target.value)}>
                <option value="none">
                    none
                </option>
                {categories.map(category => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
            <button type="submit">search</button>
        </Form>
    )
}