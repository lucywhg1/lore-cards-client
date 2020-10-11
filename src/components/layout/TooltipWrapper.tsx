import React from 'react';
import { OverlayTrigger, Tooltip, TooltipProps } from 'react-bootstrap';

interface TooltipWrapperProps {
  id: string;
  text: string;
  children: React.ReactElement;
}

const TooltipWrapper: React.FC<TooltipWrapperProps> = ({
  id,
  text,
  children
}): JSX.Element => {
  const renderTooltip = (props: Partial<TooltipProps>) => (
    <Tooltip data-testid={id} id={id} {...props}>
      {text}
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement='left'
      delay={{ show: 100, hide: 200 }}
      overlay={renderTooltip}
    >
      {children}
    </OverlayTrigger>
  );
};

export default TooltipWrapper;
