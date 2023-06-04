import { dayJS } from "#/utility/day-js";
import type { LoggerService } from "@nestjs/common";
import { ConsoleEffect, ConsoleForground } from "./console-style";

export class Logger implements LoggerService {

  private formatLog(color: ConsoleForground, type: string, message: string): string {
    const maxSpace = 8;
    const spaceSize = maxSpace - type.length;

    const datetime = dayJS().format("YYYY-MM-DD HH:mm:ss");

    const prefix = `${ConsoleForground.White}[${datetime}] ${ConsoleEffect.Bold}${color}${type.toUpperCase()}`;
    const separator = `${ConsoleEffect.Reset} ${ConsoleForground.Gray}${"-".repeat(spaceSize)}» `;
    const content = `${ConsoleEffect.Reset}${message}`;

    return `${prefix}${separator}${content}`;
  }

  public log(message: string): void {
    console.log(this.formatLog(ConsoleForground.Blue, "info", message));
  }

  public error(message: string): void {
    console.log(this.formatLog(ConsoleForground.Red, "error", message));
  }

  public warn(message: string): void {
    console.log(this.formatLog(ConsoleForground.Yellow, "warn", message));
  }

  public debug(message: string): void {
    console.log(this.formatLog(ConsoleForground.Cyan, "debug", message));
  }

  public verbose(message: string): void {
    console.log(this.formatLog(ConsoleForground.Magenta, "verbose", message));
  }

}