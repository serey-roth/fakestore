import { Form } from "@remix-run/react";

type PaginationProps = {
    currentPage: number,
    hasMore: boolean,
};

export default function Pagination({
    currentPage,
    hasMore,
}: PaginationProps) {
    return (
        <>
            <Form
            reloadDocument
            method="post">
                <input
                name="currentPage"
                type="hidden"
                value={currentPage}>
                </input>
                <button
                name="paginationAction"
                value="previous"
                disabled={currentPage === 1}
                className="px-1 bg-gray-400 text-gray-100 rounded-sm">
                    previous
                </button>
                <button
                name="paginationAction"
                value="next"
                disabled={!hasMore}
                className="ml-1 px-1 bg-gray-400 text-gray-100 rounded-sm">
                    next
                </button>
            </Form>
        </>
    )
}