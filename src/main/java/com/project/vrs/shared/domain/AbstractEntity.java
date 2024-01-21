package com.project.vrs.shared.domain;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.Version;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class AbstractEntity extends AbstractPersist<Long> {


    @Getter
    @Setter
    @Column(name = "created_date", updatable = false)
    @CreatedDate
    private Date createdDate = new Date();

    @Getter
    @Setter
    @LastModifiedDate
    @Column(name = "last_modified_date")
    private Date lastModifiedDate = new Date();

    @Getter
    @Setter
    @Version
    private int version;

    @Getter
    @Setter
    @Column(name = "created_by_id")
    private Long createdBy;

    @Getter
    @Setter
    @Column(name = "last_modified_by_id")
    private Long lastModifiedBy;
}
