import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, n as useComposedRefs, a as cn, I as Input, e as ListingCategory, i as ListingCondition, E as ExternalBlob, B as Button, h as Badge, u as useBackend, l as useAuth, o as useQueryClient, p as ue } from "./index-gsR6w5On.js";
import { u as useMutation } from "./useMutation-Bi8NVf3W.js";
import { L as Label } from "./label-BFKrZYP4.js";
import { u as useId, P as Primitive, c as composeEventHandlers, a as createContextScope, b as useControllableState, d as Presence } from "./index-BnjX19SW.js";
import { e as createCollection, u as useDirection, f as usePrevious, g as useSize, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DELqebDA.js";
import { u as useCallbackRef } from "./index-T7DfQMot.js";
import { T as Textarea } from "./textarea-zztFCMmL.js";
import "./index-DEJXbCLB.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]];
const Circle = createLucideIcon("circle", __iconNode);
var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS = { bubbles: false, cancelable: true };
var GROUP_NAME = "RovingFocusGroup";
var [Collection, useCollection, createCollectionScope] = createCollection(GROUP_NAME);
var [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope(
  GROUP_NAME,
  [createCollectionScope]
);
var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
var RovingFocusGroup = reactExports.forwardRef(
  (props, forwardedRef) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Provider, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RovingFocusGroupImpl, { ...props, ref: forwardedRef }) }) });
  }
);
RovingFocusGroup.displayName = GROUP_NAME;
var RovingFocusGroupImpl = reactExports.forwardRef((props, forwardedRef) => {
  const {
    __scopeRovingFocusGroup,
    orientation,
    loop = false,
    dir,
    currentTabStopId: currentTabStopIdProp,
    defaultCurrentTabStopId,
    onCurrentTabStopIdChange,
    onEntryFocus,
    preventScrollOnEntryFocus = false,
    ...groupProps
  } = props;
  const ref = reactExports.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const direction = useDirection(dir);
  const [currentTabStopId, setCurrentTabStopId] = useControllableState({
    prop: currentTabStopIdProp,
    defaultProp: defaultCurrentTabStopId ?? null,
    onChange: onCurrentTabStopIdChange,
    caller: GROUP_NAME
  });
  const [isTabbingBackOut, setIsTabbingBackOut] = reactExports.useState(false);
  const handleEntryFocus = useCallbackRef(onEntryFocus);
  const getItems = useCollection(__scopeRovingFocusGroup);
  const isClickFocusRef = reactExports.useRef(false);
  const [focusableItemsCount, setFocusableItemsCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
      return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
    }
  }, [handleEntryFocus]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    RovingFocusProvider,
    {
      scope: __scopeRovingFocusGroup,
      orientation,
      dir: direction,
      loop,
      currentTabStopId,
      onItemFocus: reactExports.useCallback(
        (tabStopId) => setCurrentTabStopId(tabStopId),
        [setCurrentTabStopId]
      ),
      onItemShiftTab: reactExports.useCallback(() => setIsTabbingBackOut(true), []),
      onFocusableItemAdd: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount + 1),
        []
      ),
      onFocusableItemRemove: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount - 1),
        []
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
          "data-orientation": orientation,
          ...groupProps,
          ref: composedRefs,
          style: { outline: "none", ...props.style },
          onMouseDown: composeEventHandlers(props.onMouseDown, () => {
            isClickFocusRef.current = true;
          }),
          onFocus: composeEventHandlers(props.onFocus, (event) => {
            const isKeyboardFocus = !isClickFocusRef.current;
            if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
              const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
              event.currentTarget.dispatchEvent(entryFocusEvent);
              if (!entryFocusEvent.defaultPrevented) {
                const items = getItems().filter((item) => item.focusable);
                const activeItem = items.find((item) => item.active);
                const currentItem = items.find((item) => item.id === currentTabStopId);
                const candidateItems = [activeItem, currentItem, ...items].filter(
                  Boolean
                );
                const candidateNodes = candidateItems.map((item) => item.ref.current);
                focusFirst(candidateNodes, preventScrollOnEntryFocus);
              }
            }
            isClickFocusRef.current = false;
          }),
          onBlur: composeEventHandlers(props.onBlur, () => setIsTabbingBackOut(false))
        }
      )
    }
  );
});
var ITEM_NAME$1 = "RovingFocusGroupItem";
var RovingFocusGroupItem = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeRovingFocusGroup,
      focusable = true,
      active = false,
      tabStopId,
      children,
      ...itemProps
    } = props;
    const autoId = useId();
    const id = tabStopId || autoId;
    const context = useRovingFocusContext(ITEM_NAME$1, __scopeRovingFocusGroup);
    const isCurrentTabStop = context.currentTabStopId === id;
    const getItems = useCollection(__scopeRovingFocusGroup);
    const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
    reactExports.useEffect(() => {
      if (focusable) {
        onFocusableItemAdd();
        return () => onFocusableItemRemove();
      }
    }, [focusable, onFocusableItemAdd, onFocusableItemRemove]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Collection.ItemSlot,
      {
        scope: __scopeRovingFocusGroup,
        id,
        focusable,
        active,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            tabIndex: isCurrentTabStop ? 0 : -1,
            "data-orientation": context.orientation,
            ...itemProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!focusable) event.preventDefault();
              else context.onItemFocus(id);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => context.onItemFocus(id)),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if (event.key === "Tab" && event.shiftKey) {
                context.onItemShiftTab();
                return;
              }
              if (event.target !== event.currentTarget) return;
              const focusIntent = getFocusIntent(event, context.orientation, context.dir);
              if (focusIntent !== void 0) {
                if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
                event.preventDefault();
                const items = getItems().filter((item) => item.focusable);
                let candidateNodes = items.map((item) => item.ref.current);
                if (focusIntent === "last") candidateNodes.reverse();
                else if (focusIntent === "prev" || focusIntent === "next") {
                  if (focusIntent === "prev") candidateNodes.reverse();
                  const currentIndex = candidateNodes.indexOf(event.currentTarget);
                  candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
                }
                setTimeout(() => focusFirst(candidateNodes));
              }
            }),
            children: typeof children === "function" ? children({ isCurrentTabStop, hasTabStop: currentTabStopId != null }) : children
          }
        )
      }
    );
  }
);
RovingFocusGroupItem.displayName = ITEM_NAME$1;
var MAP_KEY_TO_FOCUS_INTENT = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function getDirectionAwareKey(key, dir) {
  if (dir !== "rtl") return key;
  return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
  const key = getDirectionAwareKey(event.key, dir);
  if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
  if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
  return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst(candidates, preventScroll = false) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
  for (const candidate of candidates) {
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
    candidate.focus({ preventScroll });
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
  }
}
function wrapArray(array, startIndex) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
var Root = RovingFocusGroup;
var Item = RovingFocusGroupItem;
var RADIO_NAME = "Radio";
var [createRadioContext, createRadioScope] = createContextScope(RADIO_NAME);
var [RadioProvider, useRadioContext] = createRadioContext(RADIO_NAME);
var Radio = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeRadio,
      name,
      checked = false,
      required,
      disabled,
      value = "on",
      onCheck,
      form,
      ...radioProps
    } = props;
    const [button, setButton] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
    const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
    const isFormControl = button ? form || !!button.closest("form") : true;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(RadioProvider, { scope: __scopeRadio, checked, disabled, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.button,
        {
          type: "button",
          role: "radio",
          "aria-checked": checked,
          "data-state": getState(checked),
          "data-disabled": disabled ? "" : void 0,
          disabled,
          value,
          ...radioProps,
          ref: composedRefs,
          onClick: composeEventHandlers(props.onClick, (event) => {
            if (!checked) onCheck == null ? void 0 : onCheck();
            if (isFormControl) {
              hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
              if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
          })
        }
      ),
      isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        RadioBubbleInput,
        {
          control: button,
          bubbles: !hasConsumerStoppedPropagationRef.current,
          name,
          value,
          checked,
          required,
          disabled,
          form,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Radio.displayName = RADIO_NAME;
var INDICATOR_NAME = "RadioIndicator";
var RadioIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeRadio, forceMount, ...indicatorProps } = props;
    const context = useRadioContext(INDICATOR_NAME, __scopeRadio);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.checked, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        "data-state": getState(context.checked),
        "data-disabled": context.disabled ? "" : void 0,
        ...indicatorProps,
        ref: forwardedRef
      }
    ) });
  }
);
RadioIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "RadioBubbleInput";
var RadioBubbleInput = reactExports.forwardRef(
  ({
    __scopeRadio,
    control,
    checked,
    bubbles = true,
    ...props
  }, forwardedRef) => {
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(ref, forwardedRef);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = ref.current;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        setChecked.call(input, checked);
        input.dispatchEvent(event);
      }
    }, [prevChecked, checked, bubbles]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.input,
      {
        type: "radio",
        "aria-hidden": true,
        defaultChecked: checked,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
RadioBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
  return checked ? "checked" : "unchecked";
}
var ARROW_KEYS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
var RADIO_GROUP_NAME = "RadioGroup";
var [createRadioGroupContext] = createContextScope(RADIO_GROUP_NAME, [
  createRovingFocusGroupScope,
  createRadioScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var useRadioScope = createRadioScope();
var [RadioGroupProvider, useRadioGroupContext] = createRadioGroupContext(RADIO_GROUP_NAME);
var RadioGroup$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeRadioGroup,
      name,
      defaultValue,
      value: valueProp,
      required = false,
      disabled = false,
      orientation,
      dir,
      loop = true,
      onValueChange,
      ...groupProps
    } = props;
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeRadioGroup);
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      defaultProp: defaultValue ?? null,
      onChange: onValueChange,
      caller: RADIO_GROUP_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      RadioGroupProvider,
      {
        scope: __scopeRadioGroup,
        name,
        required,
        disabled,
        value,
        onValueChange: setValue,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Root,
          {
            asChild: true,
            ...rovingFocusGroupScope,
            orientation,
            dir: direction,
            loop,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Primitive.div,
              {
                role: "radiogroup",
                "aria-required": required,
                "aria-orientation": orientation,
                "data-disabled": disabled ? "" : void 0,
                dir: direction,
                ...groupProps,
                ref: forwardedRef
              }
            )
          }
        )
      }
    );
  }
);
RadioGroup$1.displayName = RADIO_GROUP_NAME;
var ITEM_NAME = "RadioGroupItem";
var RadioGroupItem$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeRadioGroup, disabled, ...itemProps } = props;
    const context = useRadioGroupContext(ITEM_NAME, __scopeRadioGroup);
    const isDisabled = context.disabled || disabled;
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeRadioGroup);
    const radioScope = useRadioScope(__scopeRadioGroup);
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    const checked = context.value === itemProps.value;
    const isArrowKeyPressedRef = reactExports.useRef(false);
    reactExports.useEffect(() => {
      const handleKeyDown = (event) => {
        if (ARROW_KEYS.includes(event.key)) {
          isArrowKeyPressedRef.current = true;
        }
      };
      const handleKeyUp = () => isArrowKeyPressedRef.current = false;
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keyup", handleKeyUp);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("keyup", handleKeyUp);
      };
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !isDisabled,
        active: checked,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Radio,
          {
            disabled: isDisabled,
            required: context.required,
            checked,
            ...radioScope,
            ...itemProps,
            name: context.name,
            ref: composedRefs,
            onCheck: () => context.onValueChange(itemProps.value),
            onKeyDown: composeEventHandlers((event) => {
              if (event.key === "Enter") event.preventDefault();
            }),
            onFocus: composeEventHandlers(itemProps.onFocus, () => {
              var _a;
              if (isArrowKeyPressedRef.current) (_a = ref.current) == null ? void 0 : _a.click();
            })
          }
        )
      }
    );
  }
);
RadioGroupItem$1.displayName = ITEM_NAME;
var INDICATOR_NAME2 = "RadioGroupIndicator";
var RadioGroupIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeRadioGroup, ...indicatorProps } = props;
    const radioScope = useRadioScope(__scopeRadioGroup);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(RadioIndicator, { ...radioScope, ...indicatorProps, ref: forwardedRef });
  }
);
RadioGroupIndicator.displayName = INDICATOR_NAME2;
var Root2 = RadioGroup$1;
var Item2 = RadioGroupItem$1;
var Indicator = RadioGroupIndicator;
function RadioGroup({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "radio-group",
      className: cn("grid gap-3", className),
      ...props
    }
  );
}
function RadioGroupItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Item2,
    {
      "data-slot": "radio-group-item",
      className: cn(
        "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "relative flex items-center justify-center",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" })
        }
      )
    }
  );
}
const CATEGORIES = [
  { value: ListingCategory.sarees, label: "Sarees" },
  { value: ListingCategory.kurtis, label: "Kurtis" },
  { value: ListingCategory.lehengas, label: "Lehengas" },
  { value: ListingCategory.salwarSuits, label: "Salwar Suits" },
  { value: ListingCategory.jewelry, label: "Jewelry" },
  { value: ListingCategory.accessories, label: "Accessories" },
  { value: ListingCategory.footwear, label: "Footwear" },
  { value: ListingCategory.other, label: "Other" }
];
const CONDITIONS = [
  {
    value: ListingCondition.brandNew,
    label: "Brand New",
    desc: "Never used, tags on"
  },
  {
    value: ListingCondition.likeNew,
    label: "Like New",
    desc: "Barely used, no flaws"
  },
  { value: ListingCondition.good, label: "Good", desc: "Minor signs of use" },
  {
    value: ListingCondition.fair,
    label: "Fair",
    desc: "Visible wear, fully functional"
  },
  {
    value: ListingCondition.poor,
    label: "Poor",
    desc: "Heavy wear, flaws present"
  }
];
function Step1Details({ data, errors, onChange }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "title", children: [
          "Title ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: `text-xs ${data.title.length > 100 ? "text-destructive" : "text-muted-foreground"}`,
            children: [
              data.title.length,
              "/100"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "title",
          value: data.title,
          onChange: (e) => onChange("title", e.target.value),
          placeholder: "e.g. Vintage Silk Kanjeevaram Saree, deep red, 6 yards",
          maxLength: 100,
          "data-ocid": "sell.title_input"
        }
      ),
      errors.title && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-xs text-destructive",
          "data-ocid": "sell.title.field_error",
          children: errors.title
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "category", children: [
        "Category ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: data.category,
          onValueChange: (v) => onChange("category", v),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "category", "data-ocid": "sell.category_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a category" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.value, children: c.label }, c.value)) })
          ]
        }
      ),
      errors.category && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-xs text-destructive",
          "data-ocid": "sell.category.field_error",
          children: errors.category
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
        "Condition ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        RadioGroup,
        {
          value: data.condition,
          onValueChange: (v) => onChange("condition", v),
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2",
          "data-ocid": "sell.condition_radio",
          children: CONDITIONS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Label,
            {
              htmlFor: `condition-${c.value}`,
              className: [
                "flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                data.condition === c.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
              ].join(" "),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  RadioGroupItem,
                  {
                    id: `condition-${c.value}`,
                    value: c.value,
                    className: "mt-0.5"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: c.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: c.desc })
                ] })
              ]
            },
            c.value
          ))
        }
      ),
      errors.condition && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-xs text-destructive",
          "data-ocid": "sell.condition.field_error",
          children: errors.condition
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "price", children: [
        "Price ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium", children: "₹" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "price",
            type: "number",
            min: "1",
            step: "1",
            value: data.price,
            onChange: (e) => onChange("price", e.target.value),
            placeholder: "8500",
            className: "pl-7",
            "data-ocid": "sell.price_input"
          }
        )
      ] }),
      errors.price && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-xs text-destructive",
          "data-ocid": "sell.price.field_error",
          children: errors.price
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "description", children: [
          "Description ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: `text-xs ${data.description.length > 3e3 ? "text-destructive" : "text-muted-foreground"}`,
            children: [
              data.description.length,
              "/3000"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          id: "description",
          value: data.description,
          onChange: (e) => onChange("description", e.target.value),
          placeholder: "Describe fabric, occasion, zari work, age, measurements, any flaws...",
          rows: 5,
          maxLength: 3e3,
          "data-ocid": "sell.description_textarea"
        }
      ),
      errors.description && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-xs text-destructive",
          "data-ocid": "sell.description.field_error",
          children: errors.description
        }
      )
    ] })
  ] });
}
const MAJOR_CITIES = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Kolkata",
  "Pune",
  "Jaipur",
  "Ahmedabad",
  "Surat",
  "Lucknow",
  "Kochi"
];
function Step2Location({ data, errors, onChange }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "location", children: [
        "City / Location ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "location",
          value: data.location,
          onChange: (e) => onChange("location", e.target.value),
          placeholder: "Enter your city",
          "data-ocid": "sell.location_input"
        }
      ),
      errors.location && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-xs text-destructive",
          "data-ocid": "sell.location.field_error",
          children: errors.location
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mt-1", children: MAJOR_CITIES.map((city) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => onChange("location", city),
          className: [
            "px-3 py-1 rounded-full text-xs font-medium border transition-colors",
            data.location === city ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
          ].join(" "),
          "data-ocid": `sell.city_chip.${city.toLowerCase()}`,
          children: city
        },
        city
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "phone", children: [
        "Contact Phone ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium", children: "+91" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "phone",
            type: "tel",
            value: data.phone,
            onChange: (e) => onChange("phone", e.target.value.replace(/\D/g, "").slice(0, 10)),
            placeholder: "9876543210",
            className: "pl-12",
            inputMode: "numeric",
            "data-ocid": "sell.phone_input"
          }
        )
      ] }),
      errors.phone && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-xs text-destructive",
          "data-ocid": "sell.phone.field_error",
          children: errors.phone
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "email", children: [
        "Contact Email",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "email",
          type: "email",
          value: data.email,
          onChange: (e) => onChange("email", e.target.value),
          placeholder: "you@example.com",
          "data-ocid": "sell.email_input"
        }
      ),
      errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-xs text-destructive",
          "data-ocid": "sell.email.field_error",
          children: errors.email
        }
      )
    ] })
  ] });
}
function Step3Images({ images, onImagesChange }) {
  const fileInputRef = reactExports.useRef(null);
  const [isDragOver, setIsDragOver] = reactExports.useState(false);
  const [dragIdx, setDragIdx] = reactExports.useState(null);
  const [dragOverIdx, setDragOverIdx] = reactExports.useState(null);
  const MAX_IMAGES = 5;
  const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];
  const uploadFile = reactExports.useCallback(
    async (file, id) => {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
        onImagesChange(
          images.map(
            (img) => img.id === id ? { ...img, progress: pct } : img
          )
        );
      });
      return blob;
    },
    [images, onImagesChange]
  );
  const addFiles = reactExports.useCallback(
    async (files) => {
      const fileArr = Array.from(files).filter(
        (f) => ACCEPTED.includes(f.type)
      );
      const remaining = MAX_IMAGES - images.length;
      const toAdd = fileArr.slice(0, remaining);
      const newImages = toAdd.map((file) => ({
        id: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
        file,
        previewUrl: URL.createObjectURL(file),
        blob: null,
        progress: 0,
        uploading: true,
        error: null
      }));
      const next = [...images, ...newImages];
      onImagesChange(next);
      for (const img of newImages) {
        try {
          const blob = await uploadFile(img.file, img.id);
          onImagesChange(
            (prev) => prev.map(
              (i) => i.id === img.id ? { ...i, blob, uploading: false, progress: 100 } : i
            )
          );
        } catch {
          onImagesChange(
            (prev) => prev.map(
              (i) => i.id === img.id ? { ...i, uploading: false, error: "Upload failed" } : i
            )
          );
        }
      }
    },
    [images, onImagesChange, uploadFile]
  );
  const removeImage = (id) => {
    onImagesChange(images.filter((img) => img.id !== id));
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files) addFiles(e.dataTransfer.files);
  };
  const handleCardDragStart = (idx) => setDragIdx(idx);
  const handleCardDragOver = (e, idx) => {
    e.preventDefault();
    setDragOverIdx(idx);
  };
  const handleCardDrop = (e, dropIdx) => {
    e.preventDefault();
    if (dragIdx === null || dragIdx === dropIdx) {
      setDragIdx(null);
      setDragOverIdx(null);
      return;
    }
    const next = [...images];
    const [moved] = next.splice(dragIdx, 1);
    next.splice(dropIdx, 0, moved);
    onImagesChange(next);
    setDragIdx(null);
    setDragOverIdx(null);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5", children: [
    images.length < MAX_IMAGES && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => {
          var _a;
          return (_a = fileInputRef.current) == null ? void 0 : _a.click();
        },
        onDragOver: (e) => {
          e.preventDefault();
          setIsDragOver(true);
        },
        onDragLeave: () => setIsDragOver(false),
        onDrop: handleDrop,
        className: [
          "w-full rounded-xl border-2 border-dashed flex flex-col items-center justify-center py-10 gap-3 transition-colors cursor-pointer",
          isDragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/30"
        ].join(" "),
        "data-ocid": "sell.image_dropzone",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "svg",
            {
              className: "w-6 h-6 text-muted-foreground",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              "aria-hidden": "true",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 1.5,
                  d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                }
              )
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Drag photos here or click to upload" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
              "JPG, PNG or WebP · Up to ",
              MAX_IMAGES - images.length,
              " more · Max 5 total"
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: fileInputRef,
        type: "file",
        accept: "image/jpeg,image/png,image/webp",
        multiple: true,
        className: "hidden",
        onChange: (e) => e.target.files && addFiles(e.target.files),
        "data-ocid": "sell.image_upload_button"
      }
    ),
    images.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: images.map((img, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        draggable: true,
        onDragStart: () => handleCardDragStart(idx),
        onDragOver: (e) => handleCardDragOver(e, idx),
        onDrop: (e) => handleCardDrop(e, idx),
        onDragEnd: () => {
          setDragIdx(null);
          setDragOverIdx(null);
        },
        className: [
          "relative rounded-lg overflow-hidden border aspect-square cursor-grab active:cursor-grabbing transition-all",
          dragOverIdx === idx && dragIdx !== idx ? "border-primary ring-2 ring-primary/40 scale-105" : "border-border",
          dragIdx === idx ? "opacity-50" : ""
        ].join(" "),
        "data-ocid": `sell.image_card.${idx + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: img.previewUrl,
              alt: `Upload ${idx + 1}`,
              className: "w-full h-full object-cover"
            }
          ),
          idx === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-1 left-1 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded font-medium", children: "Primary" }),
          img.uploading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-background/70 flex flex-col items-center justify-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3/4 h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full bg-accent rounded-full transition-all duration-200",
                style: { width: `${img.progress}%` }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              img.progress,
              "%"
            ] })
          ] }),
          img.error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-destructive/80 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-destructive-foreground font-medium px-2 text-center", children: img.error }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => removeImage(img.id),
              className: "absolute top-1 right-1 w-6 h-6 rounded-full bg-background/90 text-foreground flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors",
              "aria-label": "Remove image",
              "data-ocid": `sell.image_remove_button.${idx + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "svg",
                {
                  className: "w-3.5 h-3.5",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M6 18L18 6M6 6l12 12"
                    }
                  )
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-1 right-1 opacity-60", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "svg",
            {
              className: "w-4 h-4 text-foreground",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              "aria-hidden": "true",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M4 6h16M4 12h16M4 18h16"
                }
              )
            }
          ) })
        ]
      },
      img.id
    )) }),
    images.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: "No images added yet. Add at least one to attract buyers." })
  ] });
}
const CATEGORY_LABELS = {
  [ListingCategory.sarees]: "Sarees",
  [ListingCategory.kurtis]: "Kurtis",
  [ListingCategory.lehengas]: "Lehengas",
  [ListingCategory.salwarSuits]: "Salwar Suits",
  [ListingCategory.jewelry]: "Jewelry",
  [ListingCategory.accessories]: "Accessories",
  [ListingCategory.footwear]: "Footwear",
  [ListingCategory.other]: "Other"
};
const CONDITION_LABELS = {
  [ListingCondition.brandNew]: "Brand New",
  [ListingCondition.likeNew]: "Like New",
  [ListingCondition.good]: "Good",
  [ListingCondition.fair]: "Fair",
  [ListingCondition.poor]: "Poor"
};
function SectionCard({ title, onEdit, ocid, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl border border-border bg-card p-4",
      "data-ocid": ocid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              type: "button",
              onClick: onEdit,
              "data-ocid": `${ocid}.edit_button`,
              children: "Edit"
            }
          )
        ] }),
        children
      ]
    }
  );
}
function Step4Review({
  data,
  images,
  onGoToStep,
  onSubmit,
  isSubmitting,
  submittedListingId,
  onPostAnother
}) {
  if (submittedListingId) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center gap-6 py-10 text-center",
        "data-ocid": "sell.success_screen",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "svg",
            {
              className: "w-8 h-8 text-accent",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              "aria-hidden": "true",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M5 13l4 4L19 7"
                }
              )
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-2", children: "Listing Posted!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Your item is now live and visible to buyers." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 w-full max-w-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                className: "flex-1",
                "data-ocid": "sell.view_listing_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `/listings/${submittedListingId}`, children: "View Listing" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                type: "button",
                onClick: onPostAnother,
                className: "flex-1",
                "data-ocid": "sell.post_another_button",
                children: "Post Another"
              }
            )
          ] })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionCard,
      {
        title: "Item Details",
        onEdit: () => onGoToStep(1),
        ocid: "sell.review_details",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: data.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: CATEGORY_LABELS[data.category] ?? data.category }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: CONDITION_LABELS[data.condition] ?? data.condition })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-bold text-primary", children: [
            "₹",
            Number(data.price).toLocaleString("en-IN")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-3", children: data.description })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionCard,
      {
        title: "Location & Contact",
        onEdit: () => onGoToStep(2),
        ocid: "sell.review_location",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground", children: [
            "📍 ",
            data.location
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "+91 ",
            data.phone
          ] }),
          data.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: data.email })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionCard,
      {
        title: `Images (${images.length})`,
        onEdit: () => onGoToStep(3),
        ocid: "sell.review_images",
        children: images.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-1", children: images.map((img, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-border",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: img.previewUrl,
                  alt: `Preview ${idx + 1}`,
                  className: "w-full h-full object-cover"
                }
              ),
              idx === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-0 left-0 right-0 text-center bg-primary/90 text-primary-foreground text-xs py-0.5", children: "Cover" })
            ]
          },
          img.id
        )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No images — consider adding some for more visibility." })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        type: "button",
        onClick: onSubmit,
        disabled: isSubmitting,
        className: "w-full h-12 text-base font-semibold mt-2",
        "data-ocid": "sell.submit_button",
        children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "svg",
            {
              className: "w-4 h-4 animate-spin",
              fill: "none",
              viewBox: "0 0 24 24",
              "aria-hidden": "true",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "circle",
                  {
                    className: "opacity-25",
                    cx: "12",
                    cy: "12",
                    r: "10",
                    stroke: "currentColor",
                    strokeWidth: "4"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "path",
                  {
                    className: "opacity-75",
                    fill: "currentColor",
                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  }
                )
              ]
            }
          ),
          "Posting..."
        ] }) : "Post Listing"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: "By posting you agree to our terms. Your listing will be visible to buyers immediately." })
  ] });
}
function StepProgress({
  currentStep,
  totalSteps,
  stepLabels
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", "data-ocid": "sell.step_progress", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-3", children: stepLabels.map((label, idx) => {
      const step = idx + 1;
      const isCompleted = step < currentStep;
      const isActive = step === currentStep;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center gap-1.5 flex-1",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: [
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors",
                  isCompleted ? "bg-accent text-accent-foreground" : isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                ].join(" "),
                children: isCompleted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "svg",
                  {
                    className: "w-4 h-4",
                    viewBox: "0 0 16 16",
                    fill: "none",
                    "aria-label": "Completed",
                    role: "img",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Completed" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: "M3 8l3.5 3.5L13 4.5",
                          stroke: "currentColor",
                          strokeWidth: "2",
                          strokeLinecap: "round",
                          strokeLinejoin: "round"
                        }
                      )
                    ]
                  }
                ) : step
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: [
                  "text-xs font-medium text-center hidden sm:block",
                  isActive ? "text-foreground" : "text-muted-foreground"
                ].join(" "),
                children: label
              }
            )
          ]
        },
        label
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute left-0 top-0 h-full bg-primary rounded-full transition-all duration-500",
        style: { width: `${(currentStep - 1) / (totalSteps - 1) * 100}%` }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-2 sm:hidden text-center", children: [
      "Step ",
      currentStep,
      " of ",
      totalSteps,
      ": ",
      stepLabels[currentStep - 1]
    ] })
  ] });
}
const SELL_STEPS = [
  "Item Details",
  "Location & Contact",
  "Images",
  "Review & Post"
];
const INITIAL_FORM_DATA = {
  title: "",
  category: "",
  condition: "",
  price: "",
  description: "",
  location: "",
  phone: "",
  email: ""
};
function validateStep(step, data) {
  const errors = {};
  if (step === 1) {
    if (!data.title || data.title.trim().length < 5)
      errors.title = "Title must be at least 5 characters";
    else if (data.title.length > 100)
      errors.title = "Title must be 100 characters or less";
    if (!data.category) errors.category = "Please select a category";
    if (!data.condition) errors.condition = "Please select a condition";
    if (!data.price || Number(data.price) <= 0)
      errors.price = "Price must be greater than ₹0";
    if (!data.description || data.description.trim().length < 20)
      errors.description = "Description must be at least 20 characters";
    else if (data.description.length > 3e3)
      errors.description = "Description is too long (max 3000 chars)";
  }
  if (step === 2) {
    if (!data.location.trim()) errors.location = "City is required";
    if (!data.phone || !/^[6-9]\d{9}$/.test(data.phone))
      errors.phone = "Enter a valid 10-digit Indian mobile number";
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      errors.email = "Enter a valid email address";
  }
  return errors;
}
function SellPage() {
  const { actor } = useBackend();
  const { isAuthenticated, login } = useAuth();
  const qc = useQueryClient();
  const [step, setStep] = reactExports.useState(1);
  const [formData, setFormData] = reactExports.useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = reactExports.useState({});
  const [images, setImages] = reactExports.useState([]);
  const [submittedListingId, setSubmittedListingId] = reactExports.useState(
    null
  );
  const handleFieldChange = reactExports.useCallback(
    (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: void 0 }));
    },
    []
  );
  const handleImagesChange = reactExports.useCallback(
    (updater) => {
      setImages(
        (prev) => typeof updater === "function" ? updater(prev) : updater
      );
    },
    []
  );
  const goToStep = (target) => {
    setErrors({});
    setStep(target);
  };
  const handleNext = () => {
    const stepErrors = validateStep(step, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setStep((s) => s + 1);
  };
  const handleBack = () => {
    setErrors({});
    setStep((s) => s - 1);
  };
  const mutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const readyImages = images.filter((img) => img.blob !== null).map((img) => img.blob);
      return actor.createListing({
        title: formData.title.trim(),
        description: formData.description.trim(),
        price: BigInt(Math.round(Number(formData.price))),
        location: formData.location.trim(),
        category: formData.category,
        condition: formData.condition,
        images: readyImages
      });
    },
    onSuccess: (listing) => {
      qc.invalidateQueries({ queryKey: ["featured-listings"] });
      ue.success("Listing posted!");
      setSubmittedListingId(String(listing.id));
    },
    onError: () => ue.error("Failed to post listing. Please try again.")
  });
  const handlePostAnother = () => {
    setFormData(INITIAL_FORM_DATA);
    setImages([]);
    setErrors({});
    setStep(1);
    setSubmittedListingId(null);
  };
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "mx-auto max-w-screen-sm px-4 py-16 text-center",
        "data-ocid": "sell.auth_required",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "svg",
            {
              className: "w-8 h-8 text-primary",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              "aria-hidden": "true",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 1.5,
                  d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                }
              )
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-3", children: "Login to Post a Listing" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6 max-w-xs mx-auto", children: "Sign in with Internet Identity to start selling your pre-loved items." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: login, size: "lg", "data-ocid": "sell.login_button", children: "Login with Internet Identity" })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-screen-sm px-4 py-8", "data-ocid": "sell.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Post a Listing" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Share your item with thousands of buyers" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StepProgress,
      {
        currentStep: submittedListingId ? SELL_STEPS.length + 1 : step,
        totalSteps: SELL_STEPS.length,
        stepLabels: [...SELL_STEPS]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm", children: [
      step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Step1Details,
        {
          data: formData,
          errors,
          onChange: handleFieldChange
        }
      ),
      step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Step2Location,
        {
          data: formData,
          errors,
          onChange: handleFieldChange
        }
      ),
      step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsx(Step3Images, { images, onImagesChange: handleImagesChange }),
      step === 4 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Step4Review,
        {
          data: formData,
          images,
          onGoToStep: goToStep,
          onSubmit: () => mutation.mutate(),
          isSubmitting: mutation.isPending,
          submittedListingId,
          onPostAnother: handlePostAnother
        }
      ),
      step < 4 && !submittedListingId && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-6 pt-5 border-t border-border", children: [
        step > 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: handleBack,
            "data-ocid": "sell.back_button",
            children: "← Back"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            onClick: handleNext,
            "data-ocid": "sell.next_button",
            children: step === 3 ? "Review →" : "Next →"
          }
        )
      ] })
    ] })
  ] });
}
export {
  SellPage
};
