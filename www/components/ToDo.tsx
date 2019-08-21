import { FunctionComponent } from "react";

export const ToDo: FunctionComponent<{}> = ({ children }) => (
    <div>
        TODO: { children }
        <style jsx>{`
            border-left: solid 5pt #c00;
            padding: 8px 16px;
            color: red;
            background: #fff5f5;
        `}</style>
    </div>
)