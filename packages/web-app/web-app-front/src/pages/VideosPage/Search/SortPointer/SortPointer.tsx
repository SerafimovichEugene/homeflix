import React, { FC } from 'react';
import { ASC, DESC, SortToUnion } from '../../../../domain';

export interface SortPointerProps {
  to: SortToUnion;
  onClick: () => void;
}

export const SortPointer: FC<SortPointerProps> = ({ to, onClick }) => {
  return (
    <div onClick={onClick}>
      {to === ASC && <span>up</span>}
      {to === DESC && <span>down</span>}
    </div>
  );
};
