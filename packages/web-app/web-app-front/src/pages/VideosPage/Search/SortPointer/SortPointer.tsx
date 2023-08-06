import React, { FC } from 'react';
import { ASC, DESC, SortToUnion } from '../../../../domain';

export interface SortPointerProps {
  to: SortToUnion;
  onClick: () => void;
}

export const SortPointer: FC<SortPointerProps> = ({ to, onClick }) => {
  return (
    <div onClick={onClick}>
      {to === ASC && <i className="bi bi-arrow-up-circle-fill"></i>}
      {to === DESC && <i className="bi bi-arrow-down-circle-fill"></i>}
    </div>
  );
};
