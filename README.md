# lucide-cli

[![npm version](https://img.shields.io/npm/v/lucide-cli?color=blue)](https://www.npmjs.com/shivamdevs/lucide-cli)
[![npm downloads](https://img.shields.io/npm/dt/lucide-cli?color=blue)](https://npmcharts.com/compare/lucide-cli?minimal=true)
[![Install Size](https://packagephobia.now.sh/badge?p=lucide-cli)](https://packagephobia.now.sh/result?p=lucide-cli)
[![GitHub](https://img.shields.io/github/license/shivamdevs/lucide-cli?color=blue)](LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/shivamdevs/lucide-cli?color=blue)](https://github.com/shivamdevs/lucide-cli/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/shivamdevs/lucide-cli?color=blue)](https://github.com/shivamdevs/lucide-cli/pulls)

A CLI tool to fetch Lucide icons from GitHub raw files and save it directly to your working directory.

> This CLI tool is inspired by and based on [Lucide](https://github.com/lucide-icons/lucide) icons.
> \
> It uses the raw files from the [`lucide/icons`](https://github.com/lucide-icons/lucide/blob/HEAD/icons) folder to fetch the icons.

## Information

This CLI tool currently supports `React` framework only.
\
New features and frameworks will be added in due time.
\
Support for both `TypeScript` and `JavaScript` is available.

## Initialization

1. Initial the tool to your project by running the following command:

    ```bash
    npx lucide-cli init
    ```

    This will also install the tool automatically, if not installed previously.

2. You will be asked to select the framework you are using.

    ```bash
    ℹ Welcome to Lucide CLI - <0.0.0> #current version
    ? Select the framework you are using: (Use arrow keys)
    ❯ React
    ```

    Currently, only `React` is supported.

3. Next, you will be asked whether you are using `TypeScript` or not.

    ```bash
    ? Are you using TypeScript? (Use arrow keys)
    ❯ Yes
      No
    ```

4. After this, you will be asked to provide the directory where you want to save the icons.

    ```bash
    ? Where do you want to save the icons? (src/components/lucide)
    ```

    The default directory is `src/components/lucide`.

5. Next, you will be asked to provide the default size and stroke width for the icons.

    ```bash
    ? Default size for the icons: (24)
    ? Default stroke width for the icons: (2)
    ```

    The default size is `24` and the default stroke width is `2`.

6. After providing the directory, the tool will initialize the configuration and save it to the `lucide.config.json` file.

    ```bash
    ✔ Configuration file created successfully
    ✔ Icon directory created successfully
    ✔ TypeScript definitions file created successfully
    ✔ Lucide CLI has been successfully initialized
    ```

7. That's it.

    Now you can start adding the icons to your project.

    ```bash
    npx lucide-cli add <icon-names...>
    ```

## Usage

### Add Icon

To add an icon to your project, run the following command:

```bash
npx lucide-cli add <icon-names...>

# Example
npx lucide-cli add activity
npx lucide-cli add plus

# You can also add multiple icons at once:
npx lucide-cli add activity plus
```

### Remove Icon

To remove an icon from your project, run the following command:

```bash
npx lucide-cli remove <icon-names...>

# Example
npx lucide-cli remove activity
npx lucide-cli remove plus

# You can also remove multiple icons at once:
npx lucide-cli remove activity plus
```

### List Icons

To list all the icons which are already added to your project, run the following command:

```bash
npx lucide-cli list

# ⠋ Looking for icons...
# ℹ - activity
# ℹ - plus
# ✔ Found 2 icons in your project
```

## Update Icon

To update the icon, to match the latest configuration file, run the following command:

```bash
npx lucide-cli update
```

---

\
Adding icon will always use the latest configuration file.
\
So you can also update specific icons by adding them again.

```bash
npx lucide-cli add <icon-names...>
```

## TypeScript Definitions

If you selected TypeScript, the tool will automatically create a TypeScript definitions file for you in the directory you provided with the name `.lucide.d.ts`.
\
All the icons added with TypeScript will use type definitions from this file.

## Configuration

You can change your project configuration by editing the `lucide.config.json` file.

Or you can re-initialize the configuration by running the following command:

```bash
npx lucide-cli init
```

### Configuration Options

```json
{
	"framework": "React",
	"typescript": false,
	"iconsDirectory": "src/components/lucide",
	"defaultSize": 24,
	"defaultStrokeWidth": 2
}
```

Always update icons after changing the configuration.

```bash
npx lucide-cli update
```

> If you change the directory, the tool will not remove the icons from the previous directory. You have to remove them manually.

### CLI

You can also use the CLI command to get the configuration details.

```bash
npx lucide-cli config
```

## Aliases

You can also use aliases for all the commands.

```bash
npx lucide-cli a <icon-names...> # Add Icon
npx lucide-cli i <icon-names...> # Add Icon
npx lucide-cli install <icon-names...> # Add Icon

npx lucide-cli r <icon-names...> # Remove Icon
npx lucide-cli rm <icon-names...> # Remove Icon
npx lucide-cli remove <icon-names...> # Remove Icon
npx lucide-cli d <icon-names...> # Remove Icon
npx lucide-cli del <icon-names...> # Remove Icon
npx lucide-cli delete <icon-names...> # Remove Icon

npx lucide-cli l # List Icons
npx lucide-cli ls # List Icons

npx lucide-cli u # Update Icons
npx lucide-cli up # Update Icons
npx lucide-cli upgrade # Update Icons
npx lucide-cli refresh # Update Icons

npx lucide-cli c # Configuration
```

## Test Configuration & Server Connection

You can test the configuration and server connection by running the following command:

```bash
npx lucide-cli test
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Original Lucide Icon Library is licensed under the ISC License - see the [LICENSE](https://github.com/lucide-icons/lucide/blob/HEAD/LICENSE) file for details.
