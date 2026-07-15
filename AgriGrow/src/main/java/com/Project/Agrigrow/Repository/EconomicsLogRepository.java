package com.Project.Agrigrow.Repository;

import com.Project.Agrigrow.Entity.EconomicsLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EconomicsLogRepository extends JpaRepository<EconomicsLog, Long> {
}
