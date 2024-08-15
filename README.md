# lucide-cli

A CLI tool to fetch Lucide icons from GitHub raw files and save it directly to your working directory.

> This CLI tool is inspired by and based on Based on [Lucide](https://github.com/lucide-icons/lucide) icons.
> It uses the raw files from the [Lucide - icons](https://github.com/lucide-icons/lucide/blob/main/icons/) folder to fetch the icons.

## Information

This CLI tool currently supports react framework only.
And supports both TypeScript and JavaScript.

## Initialization

1. Initial the tool to your project by running the following command:

    ```bash
    npx lucide-cli@latest init
    ```

2. If you don't have the tool pre-installed, it will be installed automatically.

3. You will be asked to select the framework you are using.

    ```bash
    ℹ Welcome to Lucide CLI
    ? Select the framework you are using: (Use arrow keys)
    ❯ react
    ```

    Note: Currently, only react is supported.

4. After selecting the framework, you will be asked to select the language you are using.

    ```bash
    ? Select the language you are using: (Use arrow keys)
    ❯ javascript
    typescript
    ```

5. After selecting the language, you will be asked to provide the directory where you want to save the icons.

    ```bash
    ? Enter the directory where the icons will be saved:
    (src/components/lucide)
    ```

    Note: The default directory is `src/components/lucide`.

6. After providing the directory, the tool will initialize the configuration and save it to the `.lucide.json` file.

    ```bash
    ✔ Configuration file created successfully
    ✔ Icon directory created successfully
    ✔ TypeScript definitions file created successfully
    ✔ Lucide CLI has been successfully initialized
    ```

    Note: You will receive 3rd success message only if you select TypeScript as the language.

7. That's it.

    Now you can start adding the icons to your project.

    ```bash
    npx lucide add <icon-name>
    ```

## Usage

### Add Icon

To add an icon to your project, run the following command:

```bash
npx lucide add <icon-name>
```

Example:

```bash
npx lucide add activity
```

You can also add multiple icons at once:

```bash
npx lucide add activity alert-circle
```

### Remove Icon

To remove an icon from your project, run the following command:

```bash
npx lucide remove <icon-name>
```

Example:

```bash
npx lucide remove activity
```

You can also remove multiple icons at once:

```bash
npx lucide remove activity alert-circle
```

### List Icons

To list all the icons which are already added to your project, run the following command:

```bash
npx lucide list
```

## Update Icon framework / language / directory

To update the icon framework, language, or directory, run the following command:

```bash
npx lucide update
```

### Alternative Commands

1. Adding icon will always use the latest configuration file. But you can also update the configuration file by running the following command:

    ```bash
    npx lucide add <icon-name>
    ```

2. You can use the `refresh` alias to update all the icons with the latest configuration file.

    ```bash
    npx lucide refresh
    ```

## TypeScript Definitions

If you selected TypeScript as the language, the tool will automatically create a TypeScript definitions file for you in the directory you provided.

All the icons added will use the TypeScript definitions file to provide the type definitions.

## Configuration

You can change your project configuration by editing the `.lucide.json` file.

Or you can re-initialize the configuration by running the following command:

```bash
npx lucide init
```

### Configuration Options

```json
{
	"framework": "react", // "react"
	"typescript": false, // true | false
	"dir": "src/components/lucide" // relative path
}
```

Always update icons after changing the configuration.

```bash
npx lucide update
```

> If you change the directory, the tool will not remove the icons from the previous directory. You have to remove them manually.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Original Lucide is licensed under the ISC License - see the [LICENSE](https://github.com/lucide-icons/lucide/blob/main/LICENSE) file for details.
