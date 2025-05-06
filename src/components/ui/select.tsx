import { cn } from '@/utils/index';
import * as SelectPrimitive from '@radix-ui/react-select';
import { cva, type VariantProps } from 'class-variance-authority';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import * as React from 'react';

const selectTriggerVariants = cva(
  'flex w-fit items-center justify-between gap-2 rounded-md text-sm whitespace-nowrap shadow-xs transition-all outline-none',
  {
    variants: {
      size: {
        sm: 'h-8 px-3 py-1.5',
        default: 'h-9 px-4 py-2',
      },
      variant: {
        default: `
          border border-primary-500 bg-transparent text-primary-500
          focus-visible:ring-primary-500/50 focus-visible:border-primary-600
          hover:bg-primary-50 hover:text-primary-600
          dark:border-primary-400 dark:text-primary-400
          dark:focus-visible:ring-primary-400/50 dark:focus-visible:border-primary-500
          dark:hover:bg-primary-800 dark:hover:text-primary-300
        `,
        outline: `
          border border-neutral-300 bg-white text-neutral-500
          focus-visible:ring-neutral-400/50 focus-visible:border-neutral-400
          hover:bg-neutral-50 dark:border-neutral-700
          dark:bg-neutral-900 dark:text-neutral-400
          dark:focus-visible:ring-neutral-500/50 dark:hover:bg-neutral-800
        `,
        ghost: `
          bg-transparent text-primary-500 shadow-none
          hover:bg-primary-50 hover:text-primary-600
          dark:bg-transparent dark:text-primary-400
          dark:hover:bg-primary-800/40
        `,
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  }
);

function SelectTrigger({
  className,
  size,
  variant,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> &
  VariantProps<typeof selectTriggerVariants>) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(selectTriggerVariants({ size, variant, className }))}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

// SelectContent gets a similar styled approach for flexibility.
function SelectContent({
  className,
  position = 'popper',
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          'bg-white text-primary-600 shadow-md border rounded-md overflow-x-hidden overflow-y-auto dark:bg-neutral-900 dark:text-neutral-200 dark:border-neutral-800',
          position === 'popper' &&
            'translate-y-1 data-[side=bottom]:slide-in-from-top-2 ',
          className
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport className="p-1">
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

// Continues applying styles to other components...
function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        'relative flex cursor-pointer select-none items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm focus:bg-primary-50 focus:text-primary-600 dark:focus:bg-primary-800 dark:focus:text-primary-200',
        className
      )}
      {...props}
    >
      <span className="absolute right-2 flex items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

/**
 * A Select component that wraps around SelectPrimitive.Root and passes down props.
 *
 * @param {Object} props - The props to pass to the Select component. These should match the props of SelectPrimitive.Root.
 * @return {JSX.Element} The rendered React component for the Select.
 */
function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

/**
 * A React component that renders a Select group using SelectPrimitive's Group component.
 *
 * @param {Object} props - The props to configure the Select group. These props are spread into the underlying SelectPrimitive.Group component.
 * @return {JSX.Element} A JSX element representing the Select group.
 */
function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

/**
 * A React component that renders the value of a Select element, allowing custom props to be passed.
 * It utilizes `SelectPrimitive.Value` as its base component.
 *
 * @param {React.ComponentProps<typeof SelectPrimitive.Value>} props - The props to pass down to the `SelectPrimitive.Value` component.
 * @return {React.ReactElement} The rendered SelectValue component.
 */
function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

/**
 * A React component that renders a customizable trigger for a select dropdown.
 *
 * @param {Object} props - The properties for the SelectTrigger component.
 * @param {string} [props.className] - Additional CSS class names to apply to the component.
 * @param {string} [props.size="default"] - Determines the size of the trigger. Available options are "sm" and "default".
 * @param {React.ReactNode} [props.children] - Elements or components to be rendered inside the select trigger.
 * @param {Object} [props.props] - Additional properties passed to the SelectPrimitive.Trigger component.
 * @return {JSX.Element} The rendered SelectTrigger component.
 */

/**
 * A React component that renders the content portion of a select dropdown
 * using SelectPrimitive components. It allows customization of styles and
 * positioning while ensuring compatibility with the SelectPrimitive's API.
 *
 * @param {Object} params - The parameters for the SelectContent component.
 * @param {string} [params.className] - Additional CSS classes to be added to the component for customization.
 * @param {React.ReactNode} params.children - The child elements to be rendered within the dropdown content.
 * @param {string} [params.position="popper"] - The positioning mode of the dropdown content. Defaults to "popper".
 * @param {Object} [params.props] - Additional props to be passed to the SelectPrimitive.Content component.
 *
 * @return {React.ReactElement} The rendered select content component, supporting advanced styling and positioning.
 */

/**
 * Renders a styled label component for a select dropdown.
 * Combines additional classes and properties provided by the user.
 *
 * @param {Object} params - The properties passed to the component.
 * @param {string} params.className - Additional CSS class names to apply to the label component.
 * @param {...Object} params.props - Additional properties spread onto the underlying SelectPrimitive.Label component.
 *
 * @return {JSX.Element} The rendered label component for the select dropdown.
 */
function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn(
        'text-zinc-500 px-2 py-1.5 text-xs dark:text-zinc-400',
        className
      )}
      {...props}
    />
  );
}

/**
 * Renders a selectable item within a select dropdown, supporting customization
 * of styles and child content, as well as accessible states for disabled and focused items.
 *
 * @param {object} args - Props for the SelectItem component.
 * @param {string} [args.className] - Additional class names to style the select item element.
 * @param {React.ReactNode} args.children - The content to be displayed inside the select item.
 * @param {...object} [args.props] - Additional properties or attributes to be passed to the select item element.
 * @return {JSX.Element} The rendered select item component.
 */

/**
 * A React component that renders a separator line for a select dropdown.
 * Used to visually separate groups of items or sections within a dropdown.
 *
 * @param {Object} params - Component props.
 * @param {string} params.className - Additional custom class names to style the separator.
 * @param {...Object} props - Additional props to be passed to the underlying separator component.
 *
 * @return {JSX.Element} The rendered select separator component.
 */
function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn(
        'bg-zinc-200 pointer-events-none -mx-1 my-1 h-px dark:bg-zinc-800',
        className
      )}
      {...props}
    />
  );
}

/**
 * A React functional component that renders a custom scroll-up button
 * for a select dropdown. It utilizes the `SelectPrimitive.ScrollUpButton`
 * component with additional styling and customization options.
 *
 * @param {Object} props - The props for the SelectScrollUpButton component.
 * @param {string} props.className - An optional class name to apply custom styles.
 * Additional props from `SelectPrimitive.ScrollUpButton` can also be passed.
 *
 * @return {JSX.Element} A JSX element representing the scroll-up button used in a select dropdown.
 */
function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        'flex cursor-default items-center justify-center py-1',
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

/**
 * A component that renders a scroll down button for a custom select menu using SelectPrimitive.ScrollDownButton.
 *
 * @param {Object} params - The parameters passed to this component.
 * @param {string} [params.className] - Additional class names for custom styling.
 * @param {...Object} props - Remaining props passed to the SelectPrimitive.ScrollDownButton component.
 * @return {JSX.Element} A React component representing the scroll down button.
 */
function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        'flex cursor-default items-center justify-center py-1',
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
