const List = ({
    children,
    className,
}: {
    children?: React.ReactNode;
    className?: string;
}) => {
    return (
        <ul className={`my-6 ml-6 list-disc [&>li]:mt-2 ${className}`}>
            {children}
        </ul>
    );
};
export default List;
