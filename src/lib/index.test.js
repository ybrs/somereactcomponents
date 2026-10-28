/** @vitest-environment jsdom */
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Case, Else, ForEach, Other, stateUpdater, Switch, Visible } from "./index.jsx";

afterEach(cleanup);

describe("conditional components", () => {
  it("renders Visible children when its condition is true", () => {
    render(React.createElement(Visible, { when: true }, React.createElement("span", null, "shown")));
    expect(screen.getByText("shown")).toBeTruthy();
  });

  it("renders the alternate branch after Other", () => {
    render(React.createElement(Visible, { when: false },
      React.createElement("span", null, "primary"),
      React.createElement(Other),
      React.createElement("span", null, "alternate")));
    expect(screen.getByText("alternate")).toBeTruthy();
    expect(screen.queryByText("primary")).toBeNull();
  });

  it("renders only the first matching Switch branch", () => {
    render(React.createElement(Switch, null,
      React.createElement(Case, { when: true }, React.createElement("span", null, "first")),
      React.createElement(Case, { when: true }, React.createElement("span", null, "second")),
      React.createElement(Else, null, React.createElement("span", null, "fallback"))));
    expect(screen.getByText("first")).toBeTruthy();
    expect(screen.queryByText("second")).toBeNull();
    expect(screen.queryByText("fallback")).toBeNull();
  });
});

describe("ForEach", () => {
  it("expands item properties into each child", () => {
    const Label = ({ name, index }) => React.createElement("li", null, `${index}:${name}`);
    render(React.createElement("ul", null,
      React.createElement(ForEach, { data: [{ name: "Ada" }, { name: "Lin" }] }, React.createElement(Label))));
    expect(screen.getByText("0:Ada")).toBeTruthy();
    expect(screen.getByText("1:Lin")).toBeTruthy();
  });

  it("returns null for missing data", () => {
    const { container } = render(React.createElement(ForEach, { data: null }, React.createElement("span")));
    expect(container.firstChild).toBeNull();
  });
});

it("updates context state from the configured event property", () => {
  const ctx = { state: {}, setState: vi.fn() };
  const handler = stateUpdater(ctx, "title", "target.value", "initial");
  const event = { target: { value: "updated" } };
  expect(ctx.state.title).toBe("initial");
  expect(handler(event)).toBe(event);
  expect(ctx.state.title).toBe("updated");
  expect(ctx.setState).toHaveBeenCalledWith(ctx.state, expect.any(Function));
});
