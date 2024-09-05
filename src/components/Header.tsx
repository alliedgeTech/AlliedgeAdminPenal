import React from 'react';
/**
 * Interface for Header component props
 * @interface IHeaderProps
 */
interface IHeaderProps {
  latestNews: string;
  title: string;
}

export const Header: React.FC<IHeaderProps> = ({ latestNews, title }) => (
  <div className=" mb-10">
    <p className="text-lg text-gray-400">{latestNews}</p>
    <p className="text-3xl font-extrabold tracking-tight text-slate-900">
      {title}
    </p>
  </div>
);

