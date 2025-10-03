import { createReactInlineContentSpec } from '@blocknote/react';

export const Keomoji = createReactInlineContentSpec(
  {
    type: 'keomoji',
    content: 'none',
    propSchema: {
      keomoji: {
        default: '::',
      },
    },
  } as const,
  {
    render: (props) => <span>{props.inlineContent.props.keomoji}</span>,
  },
);
