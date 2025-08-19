import { createReactBlockSpec } from '@blocknote/react';
import { Loader2Icon } from 'lucide-react';

export const Loading = createReactBlockSpec(
  {
    type: 'loading',
    content: 'none',
    propSchema: {
      loading: {
        default: 'loading',
      },
    },
  },
  {
    render() {
      return (
        <div>
          <Loader2Icon className="animate-spin" />
        </div>
      );
    },
  },
);
