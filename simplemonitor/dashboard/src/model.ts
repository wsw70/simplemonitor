export type ConfigOptions = {
  type: string;
};

export type Monitor = {
  virtual_fail_count: number;
  first_failure_time: string | Date;
  last_run_duration: number;
  result: string;
  status: string;
  dependencies: ConfigOptions[];
  name: string;
  _deps: string[];
  _dependencies: string[];
  _urgent: boolean;
  _notify: boolean;
  group: string;
  _tolerance: number;
  remote_alerting: boolean;
  recover_info: string;
  recovered_info: string;
  _minimum_gap: number;
  enabled: boolean;
  running_on: string;
  _force_run: boolean;
  ran_this_time: boolean;
  host: string;
  timeout: number;
  count: number;
  _last_run: number;
  error_count: number;
  success_count: number;
  tests_run: number;
  last_result: string;
};

export type apiResponse = {
  generated: Date;
  monitors: {
    [key: string]: Monitor;
  };
};
