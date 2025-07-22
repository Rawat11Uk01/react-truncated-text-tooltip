import TruncatedText from "./components/truncated-text";

function App() {
  const longText =
    "This is a very long text that demonstrates the line-clamping functionality. It contains multiple sentences that will be truncated after the specified number of lines, and when you hover over it, you'll see the full text in a tooltip with smooth animations.";
  const shortText = "This is short text that won't be truncated.";
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center mb-12">
          <TruncatedText
            content="React Truncated Text Tooltip Component Demo"
            tag="h1"
            lines={1}
            tooltipPosition="bottom"
            className="text-4xl font-bold text-primary mb-4"
          />
          <p className="text-muted-foreground text-lg">
            A CSS-only solution for line-clamped text with hover tooltips
          </p>
        </header>

        <div className="grid gap-6">
          {/* Basic Usage */}
          <div className="border rounded-lg p-4 shadow-sm bg-white">
            <div className="mb-2 font-semibold text-lg">
              Basic Usage (2 lines)
            </div>
            <div>
              <TruncatedText
                content={longText}
                lines={2}
                className="max-w-md"
              />
            </div>
          </div>

          {/* Single Line with Custom Tooltip */}
          <div className="border rounded-lg p-4 shadow-sm bg-white">
            <div className="mb-2 font-semibold text-lg">
              Single Line with Custom Tooltip
            </div>
            <div>
              <TruncatedText
                content={longText}
                tooltipText="Custom tooltip text that's different from the content"
                lines={1}
                className="max-w-sm"
                tooltipPosition="top"
              />
            </div>
          </div>

          {/* Heading Elements */}
          <div className="border rounded-lg p-4 shadow-sm bg-white">
            <div className="mb-2 font-semibold text-lg">Heading Elements</div>
            <div className="space-y-4">
              <TruncatedText
                content="This is a very long H2 heading that will be truncated to one line"
                tag="h2"
                lines={1}
                className="text-2xl font-semibold"
                tooltipPosition="right"
              />
              <TruncatedText
                content="This is a very long H3 heading that demonstrates tooltip positioning"
                tag="h3"
                lines={1}
                className="text-xl font-medium"
                tooltipPosition="left"
              />
            </div>
          </div>

          {/* Different Tooltip Positions */}
          <div className="border rounded-lg p-4 shadow-sm bg-white">
            <div className="mb-2 font-semibold text-lg">
              Different Tooltip Positions
            </div>
            <div className="grid grid-cols-2 gap-4">
              {(
                ["top", "bottom", "left", "right"] as Array<
                  "top" | "bottom" | "left" | "right"
                >
              ).map((pos) => (
                <div key={pos} className="space-y-2">
                  <p className="text-sm font-medium">{pos} Position</p>
                  <TruncatedText
                    content={longText}
                    lines={2}
                    tooltipPosition={pos}
                    className="max-w-xs"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Custom Styling */}
          <div className="border rounded-lg p-4 shadow-sm bg-white">
            <div className="mb-2 font-semibold text-lg">Custom Styling</div>
            <div className="space-y-4">
              <TruncatedText
                content={longText}
                lines={2}
                className="max-w-md"
                truncatedClassName="text-lg text-blue-600 font-medium"
                tooltipClassName="bg-blue-900 text-blue-100 border border-blue-700"
                tooltipPosition="top"
              />
              <TruncatedText
                content={longText}
                lines={3}
                className="max-w-lg"
                truncatedClassName="text-green-700 italic"
                tooltipClassName="bg-green-800 text-green-100 text-sm px-3 py-2 rounded-lg"
                tooltipPosition="bottom"
              />
            </div>
          </div>

          {/* JSX Content */}
          <div className="border rounded-lg p-4 shadow-sm bg-white">
            <div className="mb-2 font-semibold text-lg">JSX Content</div>
            <div>
              <TruncatedText
                content={
                  <>
                    <strong>Important:</strong> This is formatted text with{" "}
                    <em>emphasis</em> and{" "}
                    <span className="text-red-600">colored text</span> that will
                    be truncated
                  </>
                }
                tooltipText="Important: This is formatted text with emphasis and colored text that will be truncated"
                lines={1}
                className="max-w-sm"
                tooltipPosition="top"
              />
            </div>
          </div>

          {/* Short Text (No Tooltip) */}
          <div className="border rounded-lg p-4 shadow-sm bg-white">
            <div className="mb-2 font-semibold text-lg">
              Short Text (No Tooltip)
            </div>
            <div>
              <TruncatedText
                content={shortText}
                lines={2}
                className="max-w-md"
              />
            </div>
          </div>
        </div>

        <footer className="text-center mt-12 pt-8 border-t">
          <p className="text-muted-foreground">
            Hover over the truncated text to see the tooltips in action!
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
