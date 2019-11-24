import React from "react";

export const Debug = ({ value }: { value: any }) => (
    <dl>
        {Object.keys(value).map(key => (
            <div className="md:flex md:items-center mb-4">
                <div className="md:w-1/4">
                    <dt className="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                        {key}
                    </dt>
                </div>
                <div className="md:w-3/4">
                    <dd className="py-2 px-4 bg-gray-300 text-gray-700">
                        {JSON.stringify(value[key], null, 2)}
                    </dd>
                </div>
            </div>
        ))}
    </dl>
);
