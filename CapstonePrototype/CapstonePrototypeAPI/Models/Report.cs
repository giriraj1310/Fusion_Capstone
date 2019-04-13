using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CapstonePrototypeAPI.Models {
    public class Report {
        public long? ReportId { get; }
        public SalesRepresentative SalesRepresentative { get; }
        public Business Business { get; }
        public bool WasReportedOnLocation { get; set; }
        public bool IsQualifiedReport { get; set; }

        public Report(long reportId, SalesRepresentative salesRepresentative, Business business) {
            ReportId = reportId;
            SalesRepresentative = salesRepresentative;
            Business = business;
        }

        public Report(SalesRepresentative salesRepresentative, Business business) {
            ReportId = null;
            SalesRepresentative = salesRepresentative;
            Business = business;
        }
    }
}
